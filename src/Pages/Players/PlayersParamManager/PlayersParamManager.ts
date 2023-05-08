import { Accessor, InitializedResource, Setter, createSignal } from 'solid-js';
import { orderBy as orderByLodash } from 'lodash';
import ChartManager, { IChartManager } from '../../../utils/ChartManager';
import compareStrings from '../../../utils/compareStrings';

interface IPlayersParamManager extends IChartManager {
    readonly teamsFilter: Accessor<string[]>;
    readonly currentPage: Accessor<number>;
    readonly totalPage: Accessor<number>;
    readonly setTotalPage: Setter<number>;
    initTeamsParam(): void;
    initPageParam(): void;
    updateOrderedRows(): void;
}

export default class PlayersParamManager
    extends ChartManager
    implements IPlayersParamManager
{
    private readonly rowsPerPage: number = 25;

    public readonly teamsFilter: Accessor<string[]>;

    private readonly setTeamsFilter: Setter<string[]>;

    public readonly currentPage: Accessor<number>;

    private readonly setCurrentPage: Setter<number>;

    public readonly totalPage: Accessor<number>;

    public readonly setTotalPage: Setter<number>;

    private readonly rows: InitializedResource<
        Record<string, string | number>[]
    >;

    constructor(rows: InitializedResource<Record<string, string | number>[]>) {
        super('full_name,age');

        [this.teamsFilter, this.setTeamsFilter] = createSignal<string[]>([]);
        [this.currentPage, this.setCurrentPage] = createSignal<number>(1);
        [this.totalPage, this.setTotalPage] = createSignal<number>(1);

        this.rows = rows;
    }

    public initTeamsParam(): void {
        this.setTeamsFilter(
            this.searchParams.teams ? this.searchParams.teams?.split(',') : []
        );
    }

    public initPageParam(): void {
        if (
            this.searchParams.page &&
            !Number.isNaN(+this.searchParams.page) &&
            +this.searchParams.page <= this.totalPage()
        ) {
            this.setCurrentPage(+this.searchParams.page);
        } else if (this.totalPage() !== 0) {
            this.setSearchParams({
                ...this.searchParams,
                page: 1,
            });
        }
    }

    private filterRows(): Record<string, string | number>[] {
        return this.rows().filter(
            ({ current_club, full_name }) =>
                (this.teamsFilter().length
                    ? this.teamsFilter().includes(current_club as string)
                    : true) &&
                compareStrings(full_name as string, this.searchValue())
        );
    }

    public updateOrderedRows(): void {
        const newOrderedRows = orderByLodash(
            this.filterRows(),
            this.orderByIds(),
            this.orderByDirections()
        );

        this.setTotalPage(Math.ceil(newOrderedRows.length / this.rowsPerPage));

        this.setOrderedRows(
            newOrderedRows.slice(
                (this.currentPage() - 1) * this.rowsPerPage,
                this.currentPage() * this.rowsPerPage
            )
        );
    }
}

import { Accessor, Setter, createSignal } from 'solid-js';
import ParamManager, { IParamManager } from '../ParamManager';

export interface IChartManager extends IParamManager {
    readonly selectedRows: Accessor<string[]>;
    readonly setSelectedRows: Setter<string[]>;
    handleOnRowCheckboxClick(rowId: string): void;
    handleOnChartModalOpen(): void;
    handleOnChartModalClose(): void;
}

export default class ChartManager
    extends ParamManager
    implements IChartManager
{
    public readonly selectedRows: Accessor<string[]>;

    public readonly setSelectedRows: Setter<string[]>;

    public readonly chartModalOpen: Accessor<boolean>;

    public readonly setChartModalOpen: Setter<boolean>;

    constructor(defaultColumnsString: string) {
        super(defaultColumnsString);

        [this.selectedRows, this.setSelectedRows] = createSignal<string[]>([]);
        [this.chartModalOpen, this.setChartModalOpen] =
            createSignal<boolean>(false);
    }

    public handleOnRowCheckboxClick(rowId: string): void {
        const index = this.selectedRows().findIndex(
            (id: string) => id === rowId
        );

        if (index !== -1) {
            this.setSelectedRows((prevSelectedRows: string[]) => {
                prevSelectedRows.splice(index, 1);
                return [...prevSelectedRows];
            });
        } else {
            this.setSelectedRows((prevSelectedRows: string[]) => [
                ...prevSelectedRows,
                rowId,
            ]);
        }
    }

    public handleOnChartModalOpen(): void {
        this.setChartModalOpen(true);
    }

    public handleOnChartModalClose(): void {
        this.setChartModalOpen(false);
    }
}

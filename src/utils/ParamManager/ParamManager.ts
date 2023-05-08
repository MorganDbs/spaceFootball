import {
    NavigateOptions,
    Params,
    SetParams,
    useSearchParams,
} from '@solidjs/router';
import { Accessor, Setter, createSignal } from 'solid-js';
import orderBy, { orderByEnum } from '../orderBy';

export interface IParamManager {
    readonly columns: Accessor<string[]>;
    readonly setColumns: Setter<string[]>;
    readonly searchValue: Accessor<string>;
    readonly setSearchValue: Setter<string>;
    readonly orderByIds: Accessor<string[]>;
    readonly setOrderByIds: Setter<string[]>;
    readonly orderByDirections: Accessor<orderByEnum[]>;
    readonly setOrderByDirections: Setter<orderByEnum[]>;
    readonly orderedRows: Accessor<Record<string, string | number>[]>;
    initColumnsParam(): void;
    initSearchValueParam(): void;
    initOrderParam(): void;
    handleOnColumnClick(columnId: string): void;
}

export default class ParamManager implements IParamManager {
    private readonly defaultColumnsString: string;

    protected readonly searchParams: Params;

    protected readonly setSearchParams: (
        params: SetParams,
        options?: Partial<NavigateOptions<unknown>> | undefined
    ) => void;

    public readonly columns: Accessor<string[]>;

    public readonly setColumns: Setter<string[]>;

    public readonly searchValue: Accessor<string>;

    public readonly setSearchValue: Setter<string>;

    public readonly orderByIds: Accessor<string[]>;

    public readonly setOrderByIds: Setter<string[]>;

    public readonly orderByDirections: Accessor<orderByEnum[]>;

    public readonly setOrderByDirections: Setter<orderByEnum[]>;

    public readonly orderedRows: Accessor<Record<string, string | number>[]>;

    protected readonly setOrderedRows: Setter<
        Record<string, string | number>[]
    >;

    constructor(defaultColumnsString: string) {
        this.defaultColumnsString = defaultColumnsString;
        [this.searchParams, this.setSearchParams] = useSearchParams();
        [this.columns, this.setColumns] = createSignal<string[]>([]);
        [this.searchValue, this.setSearchValue] = createSignal<string>('');
        [this.orderByIds, this.setOrderByIds] = createSignal<string[]>([]);
        [this.orderByDirections, this.setOrderByDirections] = createSignal<
            orderByEnum[]
        >([]);
        [this.orderedRows, this.setOrderedRows] = createSignal<
            Record<string, string | number>[]
        >([]);
    }

    public initColumnsParam(): void {
        if (this.searchParams.columns) {
            this.setColumns(this.searchParams.columns?.split(','));
        } else {
            this.setSearchParams({
                ...this.searchParams,
                columns: this.defaultColumnsString,
            });
        }
    }

    public initSearchValueParam(): void {
        this.setSearchValue(this.searchParams.searchValue ?? '');
    }

    public initOrderParam(): void {
        this.setOrderByIds(
            this.searchParams.orderByIds
                ? this.searchParams.orderByIds?.split(',')
                : []
        );
        this.setOrderByDirections(
            this.searchParams.orderByDirections
                ? (this.searchParams.orderByDirections?.split(
                      ','
                  ) as orderByEnum[])
                : []
        );
    }

    public handleOnColumnClick(columnId: string): void {
        const [newOrderByIds, newOrderByDirections] = orderBy(
            columnId,
            this.orderByIds(),
            this.orderByDirections()
        );

        this.setSearchParams({
            ...this.searchParams,
            orderByIds: newOrderByIds.join(','),
            orderByDirections: newOrderByDirections.join(','),
        });
    }
}

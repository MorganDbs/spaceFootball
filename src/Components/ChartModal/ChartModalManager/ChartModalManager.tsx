import { SelectChangeEvent } from '@suid/material/Select';
import { Accessor, Setter, createSignal } from 'solid-js';

interface IChartModalManager {
    readonly chartType: Accessor<ChartType>;
    readonly column: Accessor<string>;
    readonly options: Accessor<ApexCharts.ApexOptions>;
    readonly list: Accessor<ListItem[]>;
    initChart(): void;
    handleOnColumnsChange(event: SelectChangeEvent<string>): void;
    handleOnChartTypeChange(event: SelectChangeEvent<ChartType>): void;
}

interface ListItem {
    data: number[];
}

export enum ChartType {
    line = 'line',
    area = 'area',
    bar = 'bar',
    scatter = 'scatter',
    heatmap = 'heatmap',
}

export const chartTypes: ChartType[] = [
    ChartType.line,
    ChartType.area,
    ChartType.bar,
    ChartType.scatter,
    ChartType.heatmap,
];

export default class ChartModalManager implements IChartModalManager {
    public readonly chartType: Accessor<ChartType>;

    private readonly setChartType: Setter<ChartType>;

    public readonly column: Accessor<string>;

    private readonly setColumn: Setter<string>;

    public readonly options: Accessor<ApexCharts.ApexOptions>;

    private readonly setOptions: Setter<ApexCharts.ApexOptions>;

    public readonly list: Accessor<ListItem[]>;

    private readonly setList: Setter<ListItem[]>;

    private readonly selectedRows: Accessor<string[]>;

    private readonly rows: Accessor<Record<string, string | number>[]>;

    private readonly columnId: string;

    constructor(
        defaultColumnId: string,
        columnId: string,
        selectedRows: Accessor<string[]>,
        rows: Accessor<Record<string, string | number>[]>
    ) {
        [this.chartType, this.setChartType] = createSignal<ChartType>(
            ChartType.bar
        );
        [this.column, this.setColumn] = createSignal<string>(defaultColumnId);
        [this.options, this.setOptions] = createSignal<ApexCharts.ApexOptions>({
            chart: {
                id: 'modal-chart',
            },
            xaxis: {
                categories: selectedRows(),
            },
        });
        [this.list, this.setList] = createSignal<ListItem[]>([
            {
                data: [],
            },
        ]);

        this.selectedRows = selectedRows;
        this.rows = rows;
        this.columnId = columnId;
    }

    public initChart(): void {
        const list: number[] = [];
        const xaxis: string[] = [];

        this.rows().forEach((row) => {
            if (this.selectedRows().includes(row[this.columnId] as string)) {
                list.push(row[this.column()] as number);
                xaxis.push(row[this.columnId] as string);
            }
        });

        this.setOptions({
            chart: {
                id: 'modal-chart',
            },
            xaxis: {
                categories: xaxis,
            },
        });

        this.setList([
            {
                data: list,
            },
        ]);
    }

    public handleOnColumnsChange(event: SelectChangeEvent<string>): void {
        this.setColumn(event.target.value);
    }

    public handleOnChartTypeChange(event: SelectChangeEvent<ChartType>): void {
        this.setChartType(event.target.value);
    }
}

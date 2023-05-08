import { Accessor, createEffect } from 'solid-js';
import { Dialog, DialogContent } from '@suid/material';
import { SolidApexCharts } from 'solid-apexcharts';
import ChartModalManager from './ChartModalManager';
import ChartModalTitle from './ChartModalTitle';
import ChartModalSelector from './ChartModalSelector';
import './ChartModal.less';

interface IChartModal {
    open: Accessor<boolean>;
    rows: Accessor<Record<string, string | number>[]>;
    columns: Accessor<string[]>;
    selectedRows: Accessor<string[]>;
    columnId: string;
    defaultColumnId: string;
    onClose(): void;
}

export default (props: IChartModal) => {
    const chartModalManager = new ChartModalManager(
        props.defaultColumnId,
        props.columnId,
        props.selectedRows,
        props.rows
    );

    createEffect(() => {
        chartModalManager.initChart();
    });

    return (
        <Dialog
            open={props.open()}
            onClose={props.onClose}
            fullWidth
            maxWidth="md"
            class="chart-modal"
        >
            <ChartModalTitle onClick={props.onClose} />

            <DialogContent>
                <ChartModalSelector
                    column={chartModalManager.column}
                    columns={props.columns}
                    chartType={chartModalManager.chartType}
                    onColumnsChange={chartModalManager.handleOnColumnsChange.bind(
                        chartModalManager
                    )}
                    onChartTypeChange={chartModalManager.handleOnChartTypeChange.bind(
                        chartModalManager
                    )}
                />

                <div>
                    {chartModalManager.column() && (
                        <SolidApexCharts
                            type={chartModalManager.chartType()}
                            options={chartModalManager.options()}
                            series={chartModalManager.list()}
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

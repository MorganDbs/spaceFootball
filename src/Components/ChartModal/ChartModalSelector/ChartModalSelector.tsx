import { SelectChangeEvent } from '@suid/material/Select';
import { Accessor } from 'solid-js';
import { ChartType } from '../ChartModalManager';
import SelectChartColumn from './SelectChartColumn';
import SelectChartType from './SelectChartType';
import './ChartModalSelector.less';

interface IChartModalSelector {
    column: Accessor<string>;
    columns: Accessor<string[]>;
    chartType: Accessor<ChartType>;
    onColumnsChange(event: SelectChangeEvent<string>): void;
    onChartTypeChange(event: SelectChangeEvent<ChartType>): void;
}

export default (props: IChartModalSelector) => (
    <div class="chart-selectors">
        <SelectChartColumn
            value={props.column}
            onChange={props.onColumnsChange}
            list={props.columns}
        />
        <SelectChartType
            value={props.chartType}
            onChange={props.onChartTypeChange}
        />
    </div>
);

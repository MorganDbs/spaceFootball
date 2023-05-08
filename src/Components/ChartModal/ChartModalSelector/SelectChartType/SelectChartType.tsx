import { Select, MenuItem, ListItemText } from '@suid/material';
import { Accessor } from 'solid-js';
import { SelectChangeEvent } from '@suid/material/Select';
import { ChartType, chartTypes } from '../../ChartModalManager';
import './SelectCharType.less';

interface ISelectChartType {
    value: Accessor<ChartType>;
    onChange(event: SelectChangeEvent<ChartType>): void;
}

export default (props: ISelectChartType) => (
    <Select
        class="select-chart-type"
        variant="standard"
        value={props.value()}
        onChange={props.onChange}
    >
        {chartTypes.map((name) => (
            <MenuItem value={name}>
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
);

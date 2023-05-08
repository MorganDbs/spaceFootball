import { Select, MenuItem, ListItemText } from '@suid/material';
import { SelectChangeEvent } from '@suid/material/Select';
import { Accessor } from 'solid-js';
import './SelectChartColumn.less';

interface ISelectChartModal {
    value: Accessor<string>;
    list: Accessor<string[]>;
    onChange(event: SelectChangeEvent<string>): void;
}

export default (props: ISelectChartModal) => (
    <Select
        class="select-chart-column"
        variant="standard"
        value={props.value()}
        onChange={props.onChange}
    >
        {props.list().map((name) => (
            <MenuItem value={name}>
                <ListItemText primary={name} />
            </MenuItem>
        ))}
    </Select>
);

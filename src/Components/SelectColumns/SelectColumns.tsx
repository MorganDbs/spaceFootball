import { useSearchParams } from '@solidjs/router';
import { Select, MenuItem, Checkbox, ListItemText } from '@suid/material';
import { SelectChangeEvent } from '@suid/material/Select';
import { Accessor } from 'solid-js';
import './SelectColumns.less';

interface ISelectColumns {
    value: Accessor<string[]>;
    list: Accessor<string[]>;
}

export default (props: ISelectColumns) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnColumnsChange = (
        event: SelectChangeEvent<string[]>
    ): void => {
        setSearchParams({
            ...searchParams,
            columns: event.target.value.join(','),
        });
    };

    return (
        <Select
            class="select-columns"
            multiple
            variant="standard"
            label="Select columns"
            value={props.value()}
            renderValue={(selected) => selected.join(', ')}
            onChange={handleOnColumnsChange}
        >
            {props.list().map((name) => (
                <MenuItem value={name}>
                    <Checkbox
                        color="secondary"
                        checked={props.value().indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
        </Select>
    );
};

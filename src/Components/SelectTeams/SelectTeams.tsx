import { useSearchParams } from '@solidjs/router';
import { Select, MenuItem, Checkbox, ListItemText } from '@suid/material';
import { SelectChangeEvent } from '@suid/material/Select';
import { orderBy as orderByLodash } from 'lodash';
import { Accessor } from 'solid-js';
import teamsManagerSingleton from '../../store/TeamsManager';

interface ISelectTeams {
    value: Accessor<string[]>;
}

export default (props: ISelectTeams) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnTeamsChange = (event: SelectChangeEvent<string[]>): void => {
        setSearchParams({
            ...searchParams,
            teams: event.target.value.join(','),
            page: 1,
        });
    };

    return (
        <Select
            class="select-teams"
            label="Select teams"
            variant="standard"
            multiple
            value={props.value()}
            renderValue={(selected) => selected.join(', ')}
            onChange={handleOnTeamsChange}
        >
            {orderByLodash(teamsManagerSingleton.rows(), ['common_name']).map(
                ({ common_name }) => (
                    <MenuItem value={common_name}>
                        <Checkbox
                            color="secondary"
                            checked={
                                props.value().indexOf(common_name as string) >
                                -1
                            }
                        />
                        <ListItemText primary={common_name} />
                    </MenuItem>
                )
            )}
        </Select>
    );
};

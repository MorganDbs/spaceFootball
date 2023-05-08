import { Accessor } from 'solid-js';
import InputSearch from '../../../Components/InputSearch';
import SelectColumns from '../../../Components/SelectColumns';
import SelectTeams from '../../../Components/SelectTeams';
import './PlayersHeader.less';

interface IPlayersHeader {
    searchValue: Accessor<string>;
    teamsFilter: Accessor<string[]>;
    columns: Accessor<string[]>;
    columnsList: Accessor<string[]>;
}

export default (props: IPlayersHeader) => {
    return (
        <div class="players-header">
            <InputSearch searchValue={props.searchValue} />
            <SelectColumns value={props.columns} list={props.columnsList} />
            <SelectTeams value={props.teamsFilter} />
        </div>
    );
};

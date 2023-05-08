import { Accessor } from 'solid-js';
import SelectColumns from '../../../Components/SelectColumns';
import InputSearch from '../../../Components/InputSearch';
import teamsManagerSingleton from '../../../store/TeamsManager';
import './HomeHeader.less';

interface IHomeHeader {
    searchValue: Accessor<string>;
    columns: Accessor<string[]>;
}

export default (props: IHomeHeader) => (
    <div class="home-header">
        <InputSearch searchValue={props.searchValue} />
        <SelectColumns
            value={props.columns}
            list={teamsManagerSingleton.columns}
        />
    </div>
);

import { useNavigate, Navigator } from '@solidjs/router';
import ChartManager, { IChartManager } from '../../../utils/ChartManager';
import { Accessor, Setter, createSignal } from 'solid-js';
import { orderBy as orderByFn } from 'lodash';
import compareStrings from '../../../utils/compareStrings';
import teamsManagerSingleton from '../../../store/TeamsManager';

interface IHomeParamManager extends IChartManager {
    handleOnRowActionClick(row: Record<string, string | number>): void;
    updateOrderedRows(): void;
}

export default class HomeParamManager
    extends ChartManager
    implements IHomeParamManager
{
    private readonly navigate: Navigator;

    constructor() {
        super('team_name,matches_played,wins,draws,losses,league_position');

        this.navigate = useNavigate();
    }

    public handleOnRowActionClick(row: Record<string, string | number>): void {
        this.navigate(`/players?teams=${row.common_name}`);
    }

    public updateOrderedRows(): void {
        this.setOrderedRows(
            orderByFn(
                teamsManagerSingleton
                    .rows()
                    .filter(({ team_name }) =>
                        compareStrings(team_name as string, this.searchValue())
                    ),
                this.orderByIds(),
                this.orderByDirections()
            )
        );
    }
}

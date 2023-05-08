import { Show, createEffect, createSignal } from 'solid-js';
import teamsManagerSingleton from '../../store/TeamsManager';
import DataGrid from '../../Components/DataGrid';
import HomeHeader from './HomeHeader';
import HomeParamManager from './HomeParamManager';
import './Home.less';
import DataGridSkeleton from '../../Components/DataGridSkeleton';
import ChartModal from '../../Components/ChartModal';

export default () => {
    const homeParamManager = new HomeParamManager();

    createEffect(
        () => {
            homeParamManager.updateOrderedRows();
        },
        { defer: true }
    );

    createEffect(() => {
        homeParamManager.initColumnsParam();
        homeParamManager.initSearchValueParam();
        homeParamManager.initOrderParam();
    });

    return (
        <Show
            when={!teamsManagerSingleton.rows.loading}
            fallback={<DataGridSkeleton />}
        >
            <HomeHeader
                searchValue={homeParamManager.searchValue}
                columns={homeParamManager.columns}
            />
            <DataGrid
                idName="team_name"
                columns={homeParamManager.columns}
                rows={homeParamManager.orderedRows}
                selectedRows={homeParamManager.selectedRows}
                orderByIds={homeParamManager.orderByIds}
                orderByDirections={homeParamManager.orderByDirections}
                onColumnClick={homeParamManager.handleOnColumnClick.bind(
                    homeParamManager
                )}
                onChartModalOpenClick={homeParamManager.handleOnChartModalOpen.bind(
                    homeParamManager
                )}
                chartModalOpenButtonDisabled={
                    homeParamManager.selectedRows().length === 0
                }
                onRowActionClick={homeParamManager.handleOnRowActionClick.bind(
                    homeParamManager
                )}
                onRowCheckboxClick={homeParamManager.handleOnRowCheckboxClick.bind(
                    homeParamManager
                )}
            />

            <ChartModal
                open={homeParamManager.chartModalOpen}
                columnId="team_name"
                defaultColumnId="wins"
                columns={teamsManagerSingleton.columns}
                onClose={homeParamManager.handleOnChartModalClose.bind(
                    homeParamManager
                )}
                rows={teamsManagerSingleton.rows}
                selectedRows={homeParamManager.selectedRows}
            />
        </Show>
    );
};

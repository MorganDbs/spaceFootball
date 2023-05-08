import { Show, createEffect } from 'solid-js';
import teamsManagerSingleton from '../../store/TeamsManager';
import PlayersManager from './PlayersManager';
import DataGrid from '../../Components/DataGrid';
import Pagination from '../../Components/Pagination';
import PlayersHeader from './PlayersHeader';
import PlayersParamManager from './PlayersParamManager';
import ChartModal from '../../Components/ChartModal';
import DataGridSkeleton from '../../Components/DataGridSkeleton';

export default () => {
    const playersManager = new PlayersManager();
    const playersParamManager = new PlayersParamManager(playersManager.rows);

    createEffect(
        () => {
            playersParamManager.updateOrderedRows();
        },
        { defer: true }
    );

    createEffect(() => {
        playersParamManager.initTeamsParam();
        playersParamManager.initPageParam();
        playersParamManager.initColumnsParam();
        playersParamManager.initSearchValueParam();
        playersParamManager.initOrderParam();
    });

    return (
        <Show
            when={
                !teamsManagerSingleton.rows.loading &&
                !playersManager.rows.loading
            }
            fallback={<DataGridSkeleton />}
        >
            <PlayersHeader
                searchValue={playersParamManager.searchValue}
                teamsFilter={playersParamManager.teamsFilter}
                columns={playersParamManager.columns}
                columnsList={playersManager.columns}
            />

            <DataGrid
                idName="full_name"
                columns={playersParamManager.columns}
                rows={playersParamManager.orderedRows}
                selectedRows={playersParamManager.selectedRows}
                orderByIds={playersParamManager.orderByIds}
                orderByDirections={playersParamManager.orderByDirections}
                onChartModalOpenClick={playersParamManager.handleOnChartModalOpen.bind(
                    playersParamManager
                )}
                chartModalOpenButtonDisabled={
                    playersParamManager.selectedRows().length === 0
                }
                onColumnClick={playersParamManager.handleOnColumnClick.bind(
                    playersParamManager
                )}
                onRowCheckboxClick={playersParamManager.handleOnRowCheckboxClick.bind(
                    playersParamManager
                )}
            />
            <Pagination
                currentPage={playersParamManager.currentPage}
                totalPage={playersParamManager.totalPage}
            />

            <ChartModal
                open={playersParamManager.chartModalOpen}
                columnId="full_name"
                defaultColumnId="goals_overall"
                columns={playersManager.columns}
                onClose={playersParamManager.handleOnChartModalClose.bind(
                    playersParamManager
                )}
                rows={playersManager.rows}
                selectedRows={playersParamManager.selectedRows}
            />
        </Show>
    );
};

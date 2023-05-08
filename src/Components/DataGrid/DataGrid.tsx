import { TableContainer, Table, TableBody } from '@suid/material';
import { Accessor, For, Show } from 'solid-js';

import './DataGrid.less';
import DataGridHeader from './DataGridHeader';
import DataGridBodyRow from './DataGridBodyRow';
import NoData from '../NoData';

interface IDataGrid {
    idName: string;
    rows: Accessor<Record<string, string | number>[]>;
    columns: Accessor<string[]>;
    selectedRows: Accessor<string[]>;
    orderByIds: Accessor<string[]>;
    orderByDirections: Accessor<string[]>;
    chartModalOpenButtonDisabled: boolean;
    onChartModalOpenClick(): void;
    onColumnClick: (row: string) => void;
    onRowActionClick?: (row: Record<string, string | number>) => void;
    onRowCheckboxClick(rowId: string): void;
}

export default (props: IDataGrid) => (
    <TableContainer class="data-grid-container">
        <Table stickyHeader size="small">
            <DataGridHeader
                columns={props.columns}
                orderByIds={props.orderByIds}
                orderByDirections={props.orderByDirections}
                chartModalOpenButtonDisabled={
                    props.chartModalOpenButtonDisabled
                }
                onColumnClick={props.onColumnClick}
                onRowActionClick={props.onRowActionClick}
                onChartModalOpenClick={props.onChartModalOpenClick}
            />
            <Show when={props.rows().length}>
                <TableBody class="data-grid-body">
                    <For each={props.rows()}>
                        {(row) => (
                            <DataGridBodyRow
                                idName={props.idName}
                                row={row}
                                columns={props.columns}
                                selectedRows={props.selectedRows}
                                onRowCheckboxClick={props.onRowCheckboxClick}
                                onRowActionClick={props.onRowActionClick}
                            />
                        )}
                    </For>
                </TableBody>
            </Show>
        </Table>
        <Show when={!props.rows().length}>
            <NoData />
        </Show>
    </TableContainer>
);

import { TableHead, TableRow, TableCell } from '@suid/material';
import ArrowUpwardIcon from '@suid/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@suid/icons-material/ArrowDownward';
import { Accessor, For, JSX } from 'solid-js';
import OpenChartModalButton from '../../OpenChartModalButton';

interface IDataGridHeader {
    columns: Accessor<string[]>;
    orderByIds: Accessor<string[]>;
    orderByDirections: Accessor<string[]>;
    chartModalOpenButtonDisabled: boolean;
    onColumnClick: (row: string) => void;
    onChartModalOpenClick(): void;
    onRowActionClick?: (row: Record<string, string | number>) => void;
}

export default (props: IDataGridHeader) => {
    const getIcon = (columnId: string): JSX.Element => {
        const index = props.orderByIds().findIndex((id) => id === columnId);

        if (index !== -1) {
            const orderByDirection =
                props.orderByDirections()[index] === 'asc' ? (
                    <ArrowUpwardIcon color="primary" />
                ) : (
                    <ArrowDownwardIcon color="primary" />
                );
            return (
                <span class="data-grid-header-cell-arrow">
                    {index + 1}
                    {orderByDirection}
                </span>
            );
        }

        return <span class="data-grid-header-cell-arrow" />;
    };

    return (
        <TableHead class="data-grid-header">
            <TableRow class="data-grid-row">
                <TableCell class="data-grid-cell-fixed">
                    <OpenChartModalButton
                        onClick={props.onChartModalOpenClick}
                        disabled={props.chartModalOpenButtonDisabled}
                    />
                </TableCell>
                <For each={props.columns()}>
                    {(col) => (
                        <TableCell onClick={() => props.onColumnClick(col)}>
                            <div class="data-grid-header-cell">
                                {col}
                                {getIcon(col)}
                            </div>
                        </TableCell>
                    )}
                </For>
                {props.onRowActionClick && (
                    <TableCell class="data-grid-cell-fixed" />
                )}
            </TableRow>
        </TableHead>
    );
};

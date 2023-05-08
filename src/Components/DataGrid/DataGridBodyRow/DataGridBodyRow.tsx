import { TableRow, TableCell, Checkbox, IconButton } from '@suid/material';
import { Accessor } from 'solid-js';
import VisibilityIcon from '@suid/icons-material/Visibility';

interface IDataGridBodyRow {
    idName: string;
    row: Record<string, string | number>;
    columns: Accessor<string[]>;
    selectedRows: Accessor<string[]>;
    onRowCheckboxClick(rowId: string): void;
    onRowActionClick?: (row: Record<string, string | number>) => void;
}

export default (props: IDataGridBodyRow) => (
    <TableRow>
        <TableCell class="data-grid-cell-fixed">
            <Checkbox
                color="secondary"
                onChange={() =>
                    props.onRowCheckboxClick(props.row[props.idName] as string)
                }
                checked={props
                    .selectedRows()
                    .includes(props.row[props.idName] as string)}
            />
        </TableCell>
        {props.columns().map((id) => (
            <TableCell>{props.row[id]}</TableCell>
        ))}
        {props.onRowActionClick !== undefined && (
            <TableCell class="data-grid-cell-fixed">
                <IconButton
                    color="secondary"
                    onClick={() =>
                        (
                            props.onRowActionClick as (
                                row: Record<string, string | number>
                            ) => void
                        )(props.row)
                    }
                >
                    <VisibilityIcon />
                </IconButton>
            </TableCell>
        )}
    </TableRow>
);

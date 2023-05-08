import { ListItemText, MenuItem, Select } from '@suid/material';
import { Accessor } from 'solid-js';

interface IPageSelector {
    currentPage: Accessor<number>;
    totalPage: Accessor<number>;
    onPageChange(e: any): void;
}

export default (props: IPageSelector) => (
    <Select
        value={props.currentPage()}
        onChange={props.onPageChange}
        variant="standard"
    >
        {Array(props.totalPage() || 1)
            .fill(null)
            .map((_, index) => (
                <MenuItem value={index + 1}>
                    <ListItemText primary={index + 1} />
                </MenuItem>
            ))}
    </Select>
);

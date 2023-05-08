import ArrowBackIosNewIcon from '@suid/icons-material/ArrowBackIosNew';
import { IconButton } from '@suid/material';
import { Accessor } from 'solid-js';

interface IPreviousPageButton {
    disabled: boolean;
    onClick(): void;
}

export default (props: IPreviousPageButton) => (
    <IconButton onClick={props.onClick} disabled={props.disabled}>
        <ArrowBackIosNewIcon />
    </IconButton>
);

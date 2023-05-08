import ArrowForwardIosIcon from '@suid/icons-material/ArrowForwardIos';
import { IconButton } from '@suid/material';
import { Accessor } from 'solid-js';

interface INextPageButton {
    disabled: boolean;
    onClick(): void;
}

export default (props: INextPageButton) => (
    <IconButton onClick={props.onClick} disabled={props.disabled}>
        <ArrowForwardIosIcon />
    </IconButton>
);

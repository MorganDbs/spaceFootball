import { IconButton } from '@suid/material';
import BarChartIcon from '@suid/icons-material/BarChart';

interface IOpenChartModalButton {
    disabled: boolean;
    onClick(): void;
}

export default (props: IOpenChartModalButton) => (
    <IconButton
        onClick={props.onClick}
        disabled={props.disabled}
        color="primary"
    >
        <BarChartIcon />
    </IconButton>
);

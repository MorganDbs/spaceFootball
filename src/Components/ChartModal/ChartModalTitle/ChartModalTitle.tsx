import CloseIcon from '@suid/icons-material/Close';
import { DialogTitle, IconButton } from '@suid/material';
import './ChartModalTitle.less';

interface IChartModalTitle {
    onClick(): void;
}

export default (props: IChartModalTitle) => (
    <DialogTitle class="chart-modal-title">
        <span>Chart</span>
        <IconButton onClick={props.onClick}>
            <CloseIcon />
        </IconButton>
    </DialogTitle>
);

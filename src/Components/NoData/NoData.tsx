import { Typography } from '@suid/material';
import './NoData.less';

export default () => (
    <span class="no-data-container">
        <span class="no-data">
            <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_agnejizn.json"
                background="transparent"
                speed="1"
                loop
                style="width: 300px; height: 300px;"
                autoplay
            />
            <Typography variant="h5" gutterBottom>
                No data found
            </Typography>
        </span>
    </span>
);

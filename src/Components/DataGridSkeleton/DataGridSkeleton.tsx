import { Stack, Skeleton } from '@suid/material';
import './DataGridSkeleton.less';

const headerCellHeight = '49.5px';
const bodyCellHeight = '55px';
const variant = 'rectangular';
const width = '100%';

export default () => (
    <Stack spacing={1} class="data-grid-skeleton">
        <div class="data-grid-skeleton-header">
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
            <Skeleton
                variant={variant}
                height={headerCellHeight}
                width={width}
            />
        </div>
        <div class="data-grid-skeleton-body">
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
            <Skeleton variant={variant} height={bodyCellHeight} width={width} />
        </div>
    </Stack>
);

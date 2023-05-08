import { Accessor } from 'solid-js';
import PaginationManager from './PaginationManager';
import PageSelector from './PageSelector';
import PreviousPageButton from './PreviousPageButton';
import NextPageButton from './NextPageButton';
import './Pagination.less';

interface IPagination {
    currentPage: Accessor<number>;
    totalPage: Accessor<number>;
}

export default (props: IPagination) => {
    const paginationManager = new PaginationManager(props.currentPage);

    return (
        <div class="pagination">
            <PageSelector
                currentPage={paginationManager.currentPage}
                totalPage={props.totalPage}
                onPageChange={paginationManager.handleOnPageChange.bind(
                    paginationManager
                )}
            />
            <div>
                <PreviousPageButton
                    onClick={paginationManager.handleOnPreviousPage.bind(
                        paginationManager
                    )}
                    disabled={paginationManager.currentPage() === 1}
                />
                <NextPageButton
                    onClick={paginationManager.handleOnNextPage.bind(
                        paginationManager
                    )}
                    disabled={
                        paginationManager.currentPage() === props.totalPage() ||
                        props.totalPage() === 0
                    }
                />
            </div>
        </div>
    );
};

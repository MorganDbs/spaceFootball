import {
    NavigateOptions,
    Params,
    SetParams,
    useSearchParams,
} from '@solidjs/router';
import { Accessor } from 'solid-js';

interface IPaginationManager {
    readonly currentPage: Accessor<number>;
    setParameterPage(page: number): void;
    handleOnPageChange(e: any): void;
    handleOnNextPage(): void;
    handleOnPreviousPage(): void;
}

export default class PaginationManager implements IPaginationManager {
    private readonly searchParams: Params;

    private readonly setSearchParams: (
        params: SetParams,
        options?: Partial<NavigateOptions<unknown>> | undefined
    ) => void;

    public readonly currentPage: Accessor<number>;

    constructor(currentPage: Accessor<number>) {
        [this.searchParams, this.setSearchParams] = useSearchParams();

        this.currentPage = currentPage;
    }

    public setParameterPage(page: number): void {
        this.setSearchParams({
            ...this.searchParams,
            page,
        });
    }

    public handleOnPageChange(e: any): void {
        this.setParameterPage(e.target.value);
    }

    public handleOnNextPage(): void {
        this.setParameterPage(this.currentPage() + 1);
    }

    public handleOnPreviousPage(): void {
        this.setParameterPage(this.currentPage() - 1);
    }
}

import { useSearchParams } from '@solidjs/router';
import { TextField } from '@suid/material';
import { Accessor, JSX } from 'solid-js';

interface IInputSearch {
    searchValue: Accessor<string>;
}

export default (props: IInputSearch) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOnSearchValueChange: JSX.EventHandler<
        HTMLInputElement,
        InputEvent
    > = (event): void => {
        setSearchParams({
            ...searchParams,
            searchValue: event.currentTarget.value,
            page: 1,
        });
    };

    return (
        <TextField
            placeholder="Search"
            variant="standard"
            value={props.searchValue()}
            onChange={handleOnSearchValueChange as any}
        />
    );
};

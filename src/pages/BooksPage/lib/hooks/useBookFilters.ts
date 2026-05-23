import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
    getBooksPageOrder,
    getBooksPageSearch,
    getBooksPageSort,
    getBooksPageGenres,
    getBooksPageView,
} from '../../model/selectors/booksPageSelectors';
import { BookSortField, BookGenre, BookView } from '@/entities/Book';
import { booksPageActions } from '../../model/slices/booksPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchBooksList } from '../../model/services/fetchBooksList/fetchBooksList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export function useBookFilters() {
    const view = useSelector(getBooksPageView);
    const sort = useSelector(getBooksPageSort);
    const order = useSelector(getBooksPageOrder);
    const search = useSelector(getBooksPageSearch);
    const genres = useSelector(getBooksPageGenres);

    const dispatch = useAppDispatch();

    const fetchData = useCallback(() => {
        dispatch(fetchBooksList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback(
        (view: BookView) => {
            dispatch(booksPageActions.setView(view));
        },
        [dispatch],
    );

    const onChangeSort = useCallback(
        (newSort: BookSortField) => {
            dispatch(booksPageActions.setSort(newSort));
            dispatch(booksPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(booksPageActions.setOrder(newOrder));
            dispatch(booksPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(booksPageActions.setSearch(search));
            dispatch(booksPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeGenres = useCallback(
        (value: BookGenre) => {
            dispatch(booksPageActions.setType(value));
            dispatch(booksPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        genres,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeGenres,
    };
}

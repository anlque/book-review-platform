import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { BookGenre, BookSortField } from '@/entities/Book';
import { SortOrder } from '@/shared/types/sort';
import { getBooksPageInited } from '../../selectors/booksPageSelectors';
import { booksPageActions } from '../../slices/booksPageSlice';
import { fetchBooksList } from '../fetchBooksList/fetchBooksList';

export const initBooksPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('booksPage/initBooksPage', async (searchParams, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const inited = getBooksPageInited(getState());

    if (!inited) {
        const orderFromUrl = searchParams.get('order') as SortOrder;
        const sortFromUrl = searchParams.get('sort') as BookSortField;
        const searchFromUrl = searchParams.get('search');
        const genreFromUrl = searchParams.get('type') as BookGenre;

        if (orderFromUrl) {
            dispatch(booksPageActions.setOrder(orderFromUrl));
        }
        if (sortFromUrl) {
            dispatch(booksPageActions.setSort(sortFromUrl));
        }
        if (searchFromUrl) {
            dispatch(booksPageActions.setSearch(searchFromUrl));
        }
        if (genreFromUrl) {
            dispatch(booksPageActions.setType(genreFromUrl));
        }

        dispatch(booksPageActions.initState());
        dispatch(fetchBooksList({}));
    }
});

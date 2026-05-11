import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
    getBooksPageHasMore,
    getBooksPageIsLoading,
    getBooksPageNum,
} from '../../selectors/booksPageSelectors';
import { booksPageActions } from '../../slices/booksPageSlice';
import { fetchBooksList } from '../fetchBooksList/fetchBooksList';

export const fetchNextBooksPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('booksPage/fetchNextBooksPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const hasMore = getBooksPageHasMore(getState());
    const page = getBooksPageNum(getState());
    const isLoading = getBooksPageIsLoading(getState());

    if (hasMore && !isLoading) {
        dispatch(booksPageActions.setPage(page + 1));
        dispatch(fetchBooksList({}));
    }
});


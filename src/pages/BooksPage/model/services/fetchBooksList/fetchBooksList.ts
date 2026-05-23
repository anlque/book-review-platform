import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Book, BookGenre } from '@/entities/Book';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getBooksPageLimit,
    getBooksPageNum,
    getBooksPageOrder,
    getBooksPageSearch,
    getBooksPageSort,
    getBooksPageGenres,
} from '../../selectors/booksPageSelectors';

interface FetchBooksListProps {
    replace?: boolean;
}

export const fetchBooksList = createAsyncThunk<
    Book[],
    FetchBooksListProps,
    ThunkConfig<string>
>('booksPage/fetchBooksList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = getBooksPageLimit(getState());
    const sort = getBooksPageSort(getState());
    const order = getBooksPageOrder(getState());
    const search = getBooksPageSearch(getState());
    const page = getBooksPageNum(getState());
    const genres = getBooksPageGenres(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            genres,
        });
        const response = await extra.api.get<Book[]>('/books', {
            params: {
                _expand: ['user', 'author'],
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                // TODO: array genres
                genres: genres === BookGenre.ALL ? undefined : genres,
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});

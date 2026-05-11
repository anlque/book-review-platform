import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Book, BookType } from '@/entities/Book';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import {
    getBooksPageLimit,
    getBooksPageNum,
    getBooksPageOrder,
    getBooksPageSearch,
    getBooksPageSort,
    getBooksPageType,
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
    const type = getBooksPageType(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<Book[]>('/books', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                q: search,
                type: type === BookType.ALL ? undefined : type,
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


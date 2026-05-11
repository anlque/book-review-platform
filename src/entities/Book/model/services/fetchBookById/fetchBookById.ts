import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Book } from '../../types/book';

export const fetchBookById = createAsyncThunk<
    Book,
    string | undefined,
    ThunkConfig<string>
>('bookDetails/fetchBookById', async (bookId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!bookId) {
        throw new Error('');
    }

    try {
        const response = await extra.api.get<Book>(`/books/${bookId}`, {
            params: {
                _expand: 'user',
            },
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});

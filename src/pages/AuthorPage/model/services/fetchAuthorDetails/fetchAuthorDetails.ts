import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Author } from '@/entities/Author';
import { Book } from '@/entities/Book';
import { AuthorWithBooks } from '../../types/authorDetailsSchema';

export const fetchAuthorDetails = createAsyncThunk<
    AuthorWithBooks,
    string,
    ThunkConfig<string>
>('authorDetails/fetchAuthorDetails', async (authorId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const [authorResponse, booksResponse] = await Promise.all([
            extra.api.get<Author>(`/authors/${authorId}`),
            extra.api.get<Book[]>('/books', {
                params: {
                    authorId,
                    _expand: ['user', 'author'],
                },
            }),
        ]);

        if (!authorResponse.data) {
            throw new Error();
        }

        return {
            ...authorResponse.data,
            books: booksResponse.data ?? [],
        };
    } catch {
        return rejectWithValue('error');
    }
});

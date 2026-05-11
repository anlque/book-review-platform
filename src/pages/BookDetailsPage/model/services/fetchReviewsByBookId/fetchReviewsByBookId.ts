import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

export const fetchCommentsByBookId = createAsyncThunk<
    Comment[],
    string | undefined,
    ThunkConfig<string>
>('bookDetails/fetchReviewsByBookId', async (bookId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!bookId) {
        return rejectWithValue('error');
    }

    try {
        const response = await extra.api.get<Comment[]>('/reviews', {
            params: {
                bookId,
                _expand: 'user',
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


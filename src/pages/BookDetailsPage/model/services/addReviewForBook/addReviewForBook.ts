import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';
import { getBookDetailsData } from '@/entities/Book';
import { fetchCommentsByBookId } from '../fetchReviewsByBookId/fetchReviewsByBookId';

export const addReviewForBook = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('bookDetails/addReviewForBook', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const book = getBookDetailsData(getState());

    if (!userData || !text || !book) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Comment>('/reviews', {
            bookId: book.id,
            userId: userData.id,
            text,
        });

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByBookId(book.id));

        return response.data;
    } catch (e) {
        return rejectWithValue('wrong_auth');
    }
});


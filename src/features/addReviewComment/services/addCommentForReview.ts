import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getBookDetailsData } from '@/entities/Book';
import { ReviewComment } from '@/entities/BookReview';

interface AddCommentForReviewArg {
    reviewId: string;
    text: string;
}

export const addCommentForReview = createAsyncThunk<
    ReviewComment,
    AddCommentForReviewArg,
    ThunkConfig<string>
>('bookDetails/addCommentForReview', async ({ text, reviewId }, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const book = getBookDetailsData(getState());

    if (!userData || !text || !reviewId || !book) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<ReviewComment>('/review-comments', {
            reviewId,
            bookId: book.id,
            userId: userData.id,
            createdAt: new Date().toISOString(),
            text,
        });

        if (!response.data) {
            throw new Error();
        }

        return {
            ...response.data,
            user: userData,

        };
    } catch (e) {
        return rejectWithValue('wrong_auth');
    }
});

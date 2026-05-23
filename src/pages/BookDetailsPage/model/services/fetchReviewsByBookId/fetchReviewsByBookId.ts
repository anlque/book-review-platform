import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { type BookReview, type ReviewComment, mapReviewsWithComments } from '@/entities/BookReview';

export const fetchReviewsByBookId = createAsyncThunk<
    BookReview[],
    string | undefined,
    ThunkConfig<string>
>('bookDetails/fetchReviewsByBookId', async (bookId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!bookId) {
        return rejectWithValue('error');
    }

    try {
        const [reviewsResponse, commentsResponse] = await Promise.all([
            extra.api.get<BookReview[]>('/book-reviews', {
                params: {
                    bookId,
                    _expand: 'user',
                    text_ne: '',
                },
            }),

            extra.api.get<ReviewComment[]>('/review-comments', {
                params: {
                    bookId,
                    _expand: 'user',
                },
            }),

        ]);

        if (!reviewsResponse.data || !commentsResponse.data) {
            throw new Error();
        }

        return mapReviewsWithComments(
            reviewsResponse.data,
            commentsResponse.data,
        );
    } catch (e) {
        return rejectWithValue('error');
    }
});

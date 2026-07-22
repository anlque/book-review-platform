import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { BookReview } from '@/entities/BookReview';
import { addCommentForReview } from '@/features/addReviewComment';
import { fetchReviewsByBookId } from '../services/fetchReviewsByBookId/fetchReviewsByBookId';
import { BookDetailsReviewsSchema } from '../types/BookDetailsReviewsSchema';

const bookReviewsAdapter = createEntityAdapter({
    selectId: (bookReview: BookReview) => bookReview.id,
});

export const getBookReviews = bookReviewsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.bookDetailsPage?.reviews || bookReviewsAdapter.getInitialState(),
);

// TODO: show retry in case of error

const bookDetailsReviewsSlice = createSlice({
    name: 'bookDetailsReviewsSlice',
    initialState: bookReviewsAdapter.getInitialState<BookDetailsReviewsSchema>(
        {
            isLoading: false,
            error: undefined,
            addCommentLoadingByReviewId: {},
            addCommentErrorByReviewId: {},
            ids: [],
            entities: {},
        },
    ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByBookId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchReviewsByBookId.fulfilled,
                (state, action: PayloadAction<BookReview[]>) => {
                    state.isLoading = false;
                    bookReviewsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchReviewsByBookId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(addCommentForReview.pending, (state, action) => {
                const { reviewId } = action.meta.arg;
                state.addCommentLoadingByReviewId[reviewId] = true;
                state.addCommentErrorByReviewId[reviewId] = undefined;
            })
            .addCase(addCommentForReview.fulfilled, (state, action) => {
                const comment = action.payload;
                const review = state.entities[comment.reviewId];

                state.addCommentLoadingByReviewId[comment.reviewId] = false;
                state.addCommentErrorByReviewId[comment.reviewId] = undefined;

                if (!review) {
                    return;
                }

                bookReviewsAdapter.updateOne(state, {
                    id: comment.reviewId,
                    changes: {
                        comments: [
                            ...(review.comments ?? []),
                            comment,
                        ],
                    },
                });
            })
            .addCase(addCommentForReview.rejected, (state, action) => {
                const { reviewId } = action.meta.arg;

                state.addCommentLoadingByReviewId[reviewId] = false;
                state.addCommentErrorByReviewId[reviewId] =
                    action.payload ?? 'Failed to add comment';
            });
    },
});

export const { reducer: bookDetailsReviewsReducer } = bookDetailsReviewsSlice;

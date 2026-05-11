import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';

import { Comment } from '@/entities/Comment';
import { StateSchema } from '@/app/providers/StoreProvider';
import { fetchCommentsByBookId } from '../services/fetchReviewsByBookId/fetchReviewsByBookId';
import { BookDetailsCommentsSchema } from '../types/BookDetailsCommentsSchema';

const commentsAdapter = createEntityAdapter({
    selectId: (comment: Comment) => comment.id,
});

export const getBookReviews = commentsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.bookDetailsPage?.comments || commentsAdapter.getInitialState(),
);

const bookDetailsCommentsSlice = createSlice({
    name: 'bookDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<BookDetailsCommentsSchema>(
        {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
        },
    ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByBookId.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchCommentsByBookId.fulfilled,
                (state, action: PayloadAction<Comment[]>) => {
                    state.isLoading = false;
                    commentsAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchCommentsByBookId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: bookDetailsCommentsReducer } = bookDetailsCommentsSlice;


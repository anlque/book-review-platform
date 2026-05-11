import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { Book } from '@/entities/Book';
import { fetchBookRecommendations } from '../services/fetchBookRecommendations/fetchBookRecommendations';
import { BookDetailsRecommendationsSchema } from '../types/BookDetailsRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter({
    selectId: (book: Book) => book.id,
});

export const getBookRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.bookDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    );

const bookDetailsRecommendationsSlice = createSlice({
    name: 'bookDetailsRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<BookDetailsRecommendationsSchema>(
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
            .addCase(fetchBookRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchBookRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchBookRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: bookDetailsRecommendationsReducer } =
    bookDetailsRecommendationsSlice;


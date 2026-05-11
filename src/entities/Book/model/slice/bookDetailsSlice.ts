import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBookById } from '../services/fetchBookById/fetchBookById';
import { Book } from '../types/book';
import { BookDetailsSchema } from '../types/bookDetailsSchema';

const initialState: BookDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const bookDetailsSlice = createSlice({
    name: 'bookDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchBookById.fulfilled,
                (state, action: PayloadAction<Book>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                },
            )
            .addCase(fetchBookById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: bookDetailsActions } = bookDetailsSlice;
export const { reducer: bookDetailsReducer } = bookDetailsSlice;

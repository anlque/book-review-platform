import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthorDetails } from '../services/fetchAuthorDetails/fetchAuthorDetails';
import { AuthorDetailsSchema } from '../types/authorDetailsSchema';

const initialState: AuthorDetailsSchema = {
    isLoading: false,
};

export const authorDetailsSlice = createSlice({
    name: 'authorDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthorDetails.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchAuthorDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchAuthorDetails.rejected, (state) => {
                state.isLoading = false;
                state.error = 'error';
            });
    },
});

export const { actions: authorDetailsActions } = authorDetailsSlice;
export const { reducer: authorDetailsReducer } = authorDetailsSlice;

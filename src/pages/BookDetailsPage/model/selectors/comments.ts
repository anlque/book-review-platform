import { StateSchema } from '@/app/providers/StoreProvider';

export const getBookReviewsIsLoading = (state: StateSchema) =>
    state.bookDetailsPage?.comments?.isLoading;
export const getBookReviewsError = (state: StateSchema) =>
    state.bookDetailsPage?.comments?.error;


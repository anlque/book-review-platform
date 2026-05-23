import { StateSchema } from '@/app/providers/StoreProvider';

export const getBookReviewsIsLoading = (state: StateSchema) =>
    state.bookDetailsPage?.reviews?.isLoading;
export const getBookReviewsError = (state: StateSchema) =>
    state.bookDetailsPage?.reviews?.error;

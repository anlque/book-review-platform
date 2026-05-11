import { StateSchema } from '@/app/providers/StoreProvider';

export const getBookDetailsData = (state: StateSchema) => state.bookDetails?.data;
export const getBookDetailsIsLoading = (state: StateSchema) =>
    state.bookDetails?.isLoading || false;
export const getBookDetailsError = (state: StateSchema) => state.bookDetails?.error;

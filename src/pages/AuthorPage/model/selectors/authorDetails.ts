import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthorDetailsData = (state: StateSchema) =>
    state.authorDetails?.data;

export const getAuthorDetailsIsLoading = (state: StateSchema) =>
    state.authorDetails?.isLoading ?? false;

export const getAuthorDetailsError = (state: StateSchema) =>
    state.authorDetails?.error;

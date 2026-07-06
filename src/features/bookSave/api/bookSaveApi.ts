import { rtkApi } from '@/shared/api/rtkApi';

interface SavedBook {
    id: string;
    userId: string;
    bookId: string;
}

interface SavedBookArg {
    userId: string;
    bookId: string;
}

const bookSaveApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSavedBook: build.query<SavedBook | null, SavedBookArg>({
            query: ({ userId, bookId }) => ({
                url: '/saved-books',
                params: { userId, bookId },
            }),
            transformResponse: (response: SavedBook[]) => response[0] ?? null,
            providesTags: (_result, _error, arg) => [
                { type: 'SavedBook', id: `${arg.userId}-${arg.bookId}` },
            ],
        }),
        saveBook: build.mutation<SavedBook, SavedBookArg>({
            query: (arg) => ({
                url: '/saved-books',
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: 'SavedBook', id: `${arg.userId}-${arg.bookId}` },
            ],
        }),
        unsaveBook: build.mutation<void, string>({
            query: (id) => ({
                url: `/saved-books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SavedBook'],
        }),
    }),
});

export const useGetSavedBook = bookSaveApi.useGetSavedBookQuery;
export const useSaveBook = bookSaveApi.useSaveBookMutation;
export const useUnsaveBook = bookSaveApi.useUnsaveBookMutation;

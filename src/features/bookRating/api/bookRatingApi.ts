import { rtkApi } from '@/shared/api/rtkApi';
import { Rating } from '@/entities/Rating';

interface GetBookRatingArg {
    userId: string;
    bookId: string;
}

interface RateBookArg {
    userId: string;
    bookId: string;
    rate: number;
    text?: string;
}

const bookRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBookRating: build.query<Rating | null, GetBookRatingArg>({
            query: ({ bookId, userId }) => ({
                url: '/book-reviews',
                params: {
                    userId,
                    bookId,
                },
            }),
            transformResponse: (response: Rating[]) => response[0] ?? null,
        }),
        rateBook: build.mutation<void, RateBookArg>({
            query: (arg) => ({
                url: '/book-reviews',
                method: 'POST',
                body: {
                    ...arg,
                    createdAt: new Date().toISOString(),
                },
            }),
        }),
    }),
});

// TODO: check if rating is seen right after adding and if it should be seen

export const useGetBookRating = bookRatingApi.useGetBookRatingQuery;
export const useRateBook = bookRatingApi.useRateBookMutation;

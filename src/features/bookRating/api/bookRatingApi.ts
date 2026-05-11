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
    feedback?: string;
}

const bookRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBookRating: build.query<Rating[], GetBookRatingArg>({
            query: ({ bookId, userId }) => ({
                url: '/book-ratings',
                params: {
                    userId,
                    bookId,
                },
            }),
        }),
        rateBook: build.mutation<void, RateBookArg>({
            query: (arg) => ({
                url: '/book-ratings',
                method: 'POST',
                body: {
                    ...arg,
                    bookId: arg.bookId,
                },
            }),
        }),
    }),
});

export const useGetBookRating = bookRatingApi.useGetBookRatingQuery;
export const useRateBook = bookRatingApi.useRateBookMutation;

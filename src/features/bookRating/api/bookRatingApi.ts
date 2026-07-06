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

interface BookReviewRow {
    id: string;
    rate: number;
    text?: string;
    userId: string;
    bookId: string;
}

const bookRatingTag = ({ bookId, userId }: GetBookRatingArg) => ({
    type: 'BookRating' as const,
    id: `${bookId}-${userId}`,
});

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
            transformResponse: (response: BookReviewRow[]) => {
                const row = response[0];
                if (!row) {
                    return null;
                }
                return {
                    rate: row.rate,
                    text: row.text?.trim() || undefined,
                };
            },
            providesTags: (_result, _error, arg) => [bookRatingTag(arg)],
        }),
        rateBook: build.mutation<void, RateBookArg>({
            async queryFn(arg, _api, _extra, fetchWithBQ) {
                const { userId, bookId, rate, text } = arg;

                const existingResult = await fetchWithBQ({
                    url: '/book-reviews',
                    params: { userId, bookId },
                });

                if (existingResult.error) {
                    return { error: existingResult.error };
                }

                const existingRows = existingResult.data as BookReviewRow[];
                const existing = existingRows[0];

                if (existing?.id) {
                    const patchBody: { rate: number; text?: string } = { rate };
                    if (text !== undefined) {
                        patchBody.text = text.trim();
                    }

                    const updateResult = await fetchWithBQ({
                        url: `/book-reviews/${existing.id}`,
                        method: 'PATCH',
                        body: patchBody,
                    });

                    if (updateResult.error) {
                        return { error: updateResult.error };
                    }

                    return { data: undefined };
                }

                const createResult = await fetchWithBQ({
                    url: '/book-reviews',
                    method: 'POST',
                    body: {
                        userId,
                        bookId,
                        rate,
                        text: text?.trim() ?? '',
                        createdAt: new Date().toISOString(),
                    },
                });

                if (createResult.error) {
                    return { error: createResult.error };
                }

                return { data: undefined };
            },
            invalidatesTags: (_result, _error, arg) => [
                bookRatingTag(arg),
                { type: 'BookReviewStats', id: arg.bookId },
            ],
        }),
    }),
});

// TODO: check if rating is seen right after adding

export const useGetBookRating = bookRatingApi.useGetBookRatingQuery;
export const useRateBook = bookRatingApi.useRateBookMutation;

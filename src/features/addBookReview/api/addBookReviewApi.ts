import { rtkApi } from '@/shared/api/rtkApi';

interface AddBookReviewArg {
    userId: string;
    bookId: string;
    rate: number;
    text: string;
}

interface BookReviewRow {
    id: string;
    userId: string;
    bookId: string;
    rate: number;
    text?: string;
}

const bookRatingTag = (bookId: string, userId: string) => ({
    type: 'BookRating' as const,
    id: `${bookId}-${userId}`,
});

const addBookReviewApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        addBookReview: build.mutation<void, AddBookReviewArg>({
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
                    const updateResult = await fetchWithBQ({
                        url: `/book-reviews/${existing.id}`,
                        method: 'PATCH',
                        body: {
                            rate,
                            text: text.trim(),
                        },
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
                        text: text.trim(),
                        createdAt: new Date().toISOString(),
                    },
                });

                if (createResult.error) {
                    return { error: createResult.error };
                }

                return { data: undefined };
            },
            invalidatesTags: (_result, _error, arg) => [
                { type: 'BookReviewStats', id: arg.bookId },
                bookRatingTag(arg.bookId, arg.userId),
            ],
        }),
    }),
});

export const useAddBookReview = addBookReviewApi.useAddBookReviewMutation;

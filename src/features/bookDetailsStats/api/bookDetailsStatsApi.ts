import { rtkApi } from '@/shared/api/rtkApi';
import { BookReviewStats } from '../model/types/bookReviewStats';

const bookDetailsStatsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBookReviewStats: build.query<BookReviewStats, string>({
            query: (bookId) => `/books/${bookId}/review-stats`,
            providesTags: (_result, _error, bookId) => [
                { type: 'BookReviewStats', id: bookId },
            ],
        }),
    }),
});

export const useGetBookReviewStats = bookDetailsStatsApi.useGetBookReviewStatsQuery;

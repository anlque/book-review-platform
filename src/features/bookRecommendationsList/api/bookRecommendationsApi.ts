import { Book } from '@/entities/Book';
import { rtkApi } from '@/shared/api/rtkApi';

const bookRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getBookRecommendationsList: build.query<Book[], number>({
            query: (limit) => ({
                url: '/books',
                params: {
                    _limit: limit,
                    _expand: ['user', 'author'],
                },
            }),
        }),
    }),
});

export const useBookRecommendationsList =
    bookRecommendationsApi.useGetBookRecommendationsListQuery;

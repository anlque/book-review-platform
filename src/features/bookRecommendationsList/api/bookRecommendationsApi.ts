import { rtkApi } from '@/shared/api/rtkApi';
import { Book } from '@/entities/Book';

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

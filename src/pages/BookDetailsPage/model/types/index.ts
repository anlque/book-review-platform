import { BookDetailsRecommendationsSchema } from './BookDetailsRecommendationsSchema';
import { BookDetailsReviewsSchema } from './BookDetailsReviewsSchema';

export interface BookDetailsPageSchema {
    reviews: BookDetailsReviewsSchema;
    recommendations: BookDetailsRecommendationsSchema;
}

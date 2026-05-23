import { BookDetailsReviewsSchema } from './BookDetailsReviewsSchema';
import { BookDetailsRecommendationsSchema } from './BookDetailsRecommendationsSchema';

export interface BookDetailsPageSchema {
    reviews: BookDetailsReviewsSchema;
    recommendations: BookDetailsRecommendationsSchema;
}

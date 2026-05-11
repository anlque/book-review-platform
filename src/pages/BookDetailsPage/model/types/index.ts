import { BookDetailsCommentsSchema } from './BookDetailsCommentsSchema';
import { BookDetailsRecommendationsSchema } from './BookDetailsRecommendationsSchema';

export interface BookDetailsPageSchema {
    comments: BookDetailsCommentsSchema;
    recommendations: BookDetailsRecommendationsSchema;
}


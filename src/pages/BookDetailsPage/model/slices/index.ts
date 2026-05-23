import { combineReducers } from '@reduxjs/toolkit';
import { bookDetailsRecommendationsReducer } from './bookDetailsRecommendationsSlice';
import { bookDetailsReviewsReducer } from './bookDetailsReviewsSlice';

export const bookDetailsPageReducer = combineReducers({
    recommendations: bookDetailsRecommendationsReducer,
    reviews: bookDetailsReviewsReducer,
});

import { combineReducers } from '@reduxjs/toolkit';
import { bookDetailsRecommendationsReducer } from './bookDetailsRecommendationsSlice';
import { bookDetailsCommentsReducer } from './bookDetailsCommentsSlice';

export const bookDetailsPageReducer = combineReducers({
    recommendations: bookDetailsRecommendationsReducer,
    comments: bookDetailsCommentsReducer,
});


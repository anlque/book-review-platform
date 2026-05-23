import { EntityState } from '@reduxjs/toolkit';
import { BookReview } from '@/entities/BookReview';

export interface BookDetailsReviewsSchema
    extends EntityState<BookReview, BookReview['id']> {
    isLoading?: boolean;
    error?: string;
    addCommentLoadingByReviewId: Record<string, boolean>;
    addCommentErrorByReviewId: Record<string, string | undefined>;
}

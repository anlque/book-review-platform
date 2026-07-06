import { BookReview } from '../model/types/bookReview';

export type BookReviewApiRow = Omit<BookReview, 'text' | 'user'> & {
    text?: string;
    feedback?: string;
    user?: BookReview['user'];
};

export function normalizeBookReviewFromApi(review: BookReviewApiRow): BookReview {
    // TODO: shouldn't we just prevent creating untrimmed review???
    const text = (review.text ?? review.feedback ?? '').trim();
    const { feedback: _feedback, ...rest } = review;

    return {
        ...rest,
        text,
        user: review.user!,
    };
}

export function isTextBookReview(review: BookReview): boolean {
    return review.text.trim().length > 0;
}

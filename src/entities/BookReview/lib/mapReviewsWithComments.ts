import { BookReview } from '../model/types/bookReview';
import { ReviewComment } from '../model/types/reviewComment';

export function mapReviewsWithComments(
    reviews: BookReview[],
    comments: ReviewComment[],
): BookReview[] {
    const commentsByReviewId = comments.reduce<Record<string, ReviewComment[]>>(
        (acc, comment) => {
            acc[comment.reviewId] ??= [];
            acc[comment.reviewId].push(comment);
            return acc;
        },
        {},
    );

    return reviews.map((review) => ({
        ...review,
        comments: commentsByReviewId[review.id] ?? [],
    }));
}

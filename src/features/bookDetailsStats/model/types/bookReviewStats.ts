export interface BookReviewStats {
    average: number;
    ratingsCount: number;
    reviewsCount: number;
    distribution: Record<'1' | '2' | '3' | '4' | '5', number>;
}

import { ReadingStatus } from '@/features/bookReadingStatus';

export interface BookActions {
    readingStatus: ReadingStatus | null;
    userRating: number | null;
    isReadingStatusLoading: boolean;
    isRatingLoading: boolean;
    readingStatusError?: string;
    ratingError?: string;
    onReadingStatusChange: (status: ReadingStatus) => Promise<void>;
    onRatingChange: (rating: number) => Promise<void>;
    onAddToList: () => Promise<void>;
    onWriteReview: () => void;
    onRecommend: () => Promise<void>;
    onShare: () => Promise<void>;
}

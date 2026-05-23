import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import {
    useGetBookRating,
    useRateBook,
} from '../../api/bookRatingApi';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

export interface BookRatingProps {
    className?: string;
    bookId: string;
}

// TODO: trim review comments

const BookRating = memo((props: BookRatingProps) => {
    const { className, bookId } = props;
    const { t } = useTranslation('book-details');
    const userData = useSelector(getUserAuthData);

    const { data: rating, isLoading } = useGetBookRating({
        bookId,
        userId: userData?.id ?? '',
    });
    const [rateBookMutation] = useRateBook();

    const handleRateBook = useCallback(
        (starsCount: number, text?: string) => {
            try {
                rateBookMutation({
                    userId: userData?.id ?? '',
                    bookId,
                    rate: starsCount,
                    ...(text?.trim() && { text: text.trim() }),
                });
            } catch (e) {
                // handle error
                console.log(e);
            }
        },
        [bookId, rateBookMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateBook(starsCount, feedback);
        },
        [handleRateBook],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateBook(starsCount);
        },
        [handleRateBook],
    );

    if (!userData) {
        return;
    }

    if (isLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('evaluate_book')}
            feedbackTitle={t('leave_feedback')}
            hasFeedback
        />
    );
});

export default BookRating;

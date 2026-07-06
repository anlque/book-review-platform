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
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

export interface BookRatingProps {
    className?: string;
    bookId: string;
    compact?: boolean;
}

// TODO: trim needed?

const BookRating = memo((props: BookRatingProps) => {
    const { className, bookId, compact } = props;
    const { t } = useTranslation('book-details');
    const userData = useSelector(getUserAuthData);

    const userId = userData?.id;

    const { data: rating, isLoading } = useGetBookRating(
        { bookId, userId: userId ?? '' },
        { skip: !userId },
    );
    const [rateBookMutation] = useRateBook();

    const handleRateBook = useCallback(
        async (starsCount: number, text?: string) => {
            if (!userId) {
                return;
            }

            await rateBookMutation({
                userId,
                bookId,
                rate: starsCount,
                ...(text !== undefined && { text }),
            }).unwrap();
        },
        [bookId, rateBookMutation, userId],
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
        return null;
    }

    if (isLoading) {
        return <Skeleton width="100%" height={compact ? 48 : 120} />;
    }

    if (compact) {
        return (
            <VStack gap="8" className={className} max>
                <StarRating
                    size={24}
                    selectedStars={rating?.rate ?? 0}
                    onSelect={(starsCount) => handleRateBook(starsCount)}
                />
                {!rating?.rate &&
                <Text
                    text={t('evaluate_book')}
                    size="s"
                    className={className}
                    variant="accent"
                />}
            </VStack>
        );
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

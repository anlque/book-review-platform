import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetBookReviewStats } from '@/features/bookDetailsStats';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookDetailsRatingDistribution.module.scss';

interface BookDetailsRatingDistributionProps {
    className?: string;
    bookId: string;
}

const stars = [5, 4, 3, 2, 1] as const;

export const BookDetailsRatingDistribution = memo((props: BookDetailsRatingDistributionProps) => {
    const { className, bookId } = props;
    const { t } = useTranslation('book-details');
    const { data: stats, isLoading } = useGetBookReviewStats(bookId);

    if (isLoading) {
        return <Skeleton width="100%" height={220} border="16px" />;
    }

    if (!stats?.ratingsCount) {
        return null;
    }

    return (
        <Card
            className={classNames(cls.BookDetailsRatingDistribution, {}, [className])}
            padding="16"
            border="partial"
            max
            data-testid="BookDetailsRatingDistribution"
        >
            <VStack gap="16" max>
                <Text title={t('rating_distribution')} size="m" bold />
                <VStack gap="8" max>
                    {stars.map((star) => {
                        // TODO: can we avoid as?
                        const percent =
                            stats.distribution[String(star) as keyof typeof stats.distribution] ?? 0;
                        return (
                            <HStack key={star} gap="8" align="center" max>
                                <Text
                                    text={t('stars_label', { count: star })}
                                    className={cls.starLabel}
                                />
                                <div className={cls.barTrack}>
                                    <div
                                        className={cls.barFill}
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                                <Text text={`${percent}%`} className={cls.percent} />
                            </HStack>
                        );
                    })}
                </VStack>
                <Text
                    text={t('ratings_total', { count: stats.ratingsCount })}
                    size="s"
                    className={cls.total}
                />
            </VStack>
        </Card>
    );
});

import { useTranslation } from 'react-i18next';
import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookReviewList } from '@/entities/BookReview';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { getUserAuthData } from '@/entities/User';
import { AddBookReviewModal } from '@/features/addBookReview';
import { useGetBookReviewStats } from '@/features/bookDetailsStats';
import IconPencil from '@/shared/assets/icons/pencil.svg';

import { fetchReviewsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';
import { getBookReviews } from '../../model/slices/bookDetailsReviewsSlice';
import { getBookReviewsIsLoading } from '../../model/selectors/reviews';
import cls from './BookDetailsComments.module.scss';

const PREVIEW_COUNT = 3;

interface BookDetailsCommentsProps {
    className?: string;
    id?: string;
    onReviewAdded?: () => void;
}

export const BookDetailsComments = memo((props: BookDetailsCommentsProps) => {
    const { className, id, onReviewAdded } = props;
    const { t } = useTranslation('book-details');
    const reviews = useSelector(getBookReviews.selectAll);
    const reviewsIsLoading = useSelector(getBookReviewsIsLoading);
    const dispatch = useAppDispatch();
    const user = useSelector(getUserAuthData);
    const [showAll, setShowAll] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const { data: stats } = useGetBookReviewStats(id ?? '', { skip: !id });

    useInitialEffect(() => {
        dispatch(fetchReviewsByBookId(id));
    });

    const reviewCount = stats?.reviewsCount ?? reviews.length;

    const visibleReviews = useMemo(() => {
        if (showAll) {
            return reviews;
        }
        return reviews.slice(0, PREVIEW_COUNT);
    }, [reviews, showAll]);

    const reviewsHeader = (
        <HStack max justify="between" align="center" className={cls.header}>
            <HStack gap="4">
                <Text
                    size="m"
                    bold
                    title={t('reviews')}
                />
                <Text
                    className={cls.lightText}
                    size="m"
                    bold
                    title={`(${reviewCount})`}
                />
            </HStack>
            {user && (
                <Button
                    variant="clear"
                    color="accent"
                    onClick={() => setIsReviewOpen(true)}
                    addonRight={<Icon Svg={IconPencil} width={16} height={16} />}
                >
                    {t('write_review')}

                </Button>
            )}
        </HStack>
    );

    const reviewsList = (
        <BookReviewList
            isLoading={reviewsIsLoading}
            bookReviews={visibleReviews}
        />
    );

    const handleReviewSuccess = () => {
        onReviewAdded?.();
    };

    return (
        <>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card
                        className={classNames(cls.section, {}, [className])}
                        padding="0"
                        border="partial"
                        max
                        data-testid="BookDetailsReviews"
                    >
                        <VStack gap="16" max className={cls.list}>
                            {reviewsHeader}
                            {reviewsList}
                            {reviews.length > PREVIEW_COUNT && (
                                <Button
                                    variant="clear"
                                    color="accent"
                                    onClick={() => setShowAll((prev) => !prev)}
                                >
                                    {showAll
                                        ? t('show_less_reviews')
                                        : t('show_all_reviews')}
                                </Button>
                            )}
                        </VStack>
                    </Card>
                }
                off={
                    <VStack gap="8" max className={className}>
                        <TextDeprecated size={TextSize.L} title={t('reviews')} />
                        {reviewsList}
                    </VStack>
                }
            />
            {id && (
                <AddBookReviewModal
                    bookId={id}
                    isOpen={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                    onSuccess={handleReviewSuccess}
                />
            )}
        </>
    );
});

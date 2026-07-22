import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BookReviewList } from '@/entities/BookReview';
import { getUserAuthData } from '@/entities/User';
import { AddBookReviewModal } from '@/features/addBookReview';
import { useGetBookReviewStats } from '@/features/bookDetailsStats';
import IconPencil from '@/shared/assets/icons/pencil.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getBookReviewsIsLoading } from '../../model/selectors/reviews';
import { fetchReviewsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';
import { getBookReviews } from '../../model/slices/bookDetailsReviewsSlice';
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

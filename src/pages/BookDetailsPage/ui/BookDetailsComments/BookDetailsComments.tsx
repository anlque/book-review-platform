import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookReviewList } from '@/entities/BookReview';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';

import { fetchReviewsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';
import { getBookReviews } from '../../model/slices/bookDetailsReviewsSlice';
import { getBookReviewsIsLoading } from '../../model/selectors/reviews';
import { Icon } from '@/shared/ui/redesigned/Icon';
import WriteIcon from '@/shared/assets/icons/write.svg';

interface BookDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const BookDetailsComments = memo((props: BookDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('book-details');
    const reviews = useSelector(getBookReviews.selectAll);
    const reviewsIsLoading = useSelector(getBookReviewsIsLoading);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchReviewsByBookId(id));
    });

    return (
        <VStack gap="8" max className={classNames('', {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <HStack gap="8">
                        <Icon height={30} width={30} Svg={WriteIcon} variant="currentColor" />
                        <Text size="l" title={t('reviews')} />
                    </HStack>
                }
                off={
                    <TextDeprecated size={TextSize.L} title={t('reviews')} />
                }
            />

            <BookReviewList isLoading={reviewsIsLoading} bookReviews={reviews} />
        </VStack>
    );
});

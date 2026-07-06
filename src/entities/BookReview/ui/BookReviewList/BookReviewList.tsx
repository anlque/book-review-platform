import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { BookReviewCard } from '../BookReviewCard/BookReviewCard';
import { BookReview } from '../../model/types/bookReview';
import { ToggleFeatures } from '@/shared/lib/features';
import cls from './BookReviewList.module.scss';

interface CommentListProps {
    className?: string;
    bookReviews?: BookReview[];
    isLoading?: boolean;
}

export const BookReviewList = memo((props: CommentListProps) => {
    const { className, isLoading, bookReviews } = props;
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames(cls.BookReviewList, {}, [className])}>
                <BookReviewCard isLoading />
                <BookReviewCard isLoading />
                <BookReviewCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames(cls.BookReviewList, {}, [className])}>
            {bookReviews?.length ? (
                bookReviews.map((bookReview) => (
                    <BookReviewCard
                        key={bookReview.id}
                        isLoading={isLoading}
                        bookReview={bookReview}
                    />
                ))
            ) : (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text text={t('no_comments')} />}
                    off={<TextDeprecated text={t('no_comments')} />}
                />
            )}
        </VStack>
    );
});

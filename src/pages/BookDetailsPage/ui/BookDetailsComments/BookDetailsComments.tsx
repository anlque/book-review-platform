import { useTranslation } from 'react-i18next';
import { memo, useCallback, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm } from '@/features/addCommentForm';
import { CommentList } from '@/entities/Comment';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';

import { fetchCommentsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';
import { getBookReviews } from '../../model/slices/bookDetailsCommentsSlice';
import { getBookReviewsIsLoading } from '../../model/selectors/comments';
import { addReviewForBook } from '../../model/services/addReviewForBook/addReviewForBook';

interface BookDetailsCommentsProps {
    className?: string;
    id?: string;
}

export const BookDetailsComments = memo((props: BookDetailsCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const reviews = useSelector(getBookReviews.selectAll);
    const reviewsIsLoading = useSelector(getBookReviewsIsLoading);
    const dispatch = useAppDispatch();

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addReviewForBook(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByBookId(id));
    });

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text size="l" title={t('reviews')} />}
                off={
                    <TextDeprecated size={TextSize.L} title={t('reviews')} />
                }
            />
            <Suspense fallback={<Loader />}>
                <AddCommentForm onSendComment={onSendComment} />
            </Suspense>
            <CommentList isLoading={reviewsIsLoading} comments={reviews} />
        </VStack>
    );
});


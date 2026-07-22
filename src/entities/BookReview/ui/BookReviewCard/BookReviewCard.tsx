import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { addCommentForReview } from '@/features/addReviewComment';
import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useFormatDate } from '@/shared/lib/date/useFormatDate';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookReview } from '../../model/types/bookReview';
import cls from './BookReviewCard.module.scss';
import BookReviewComments from './BookReviewComments';
import BookReviewReplyForm from './BookReviewReplyForm';

interface BookReviewCardProps {
    className?: string;
    bookReview?: BookReview;
    isLoading?: boolean;
}

export const BookReviewCard = memo((props: BookReviewCardProps) => {
    const { className, bookReview, isLoading } = props;
    const { t } = useTranslation('book-details');
    const [commentText, setCommentText] = useState('');
    const [isOpenReplyForm, setIsOpenReplyForm] = useState(false);
    const dispatch = useAppDispatch();
    const formatDate = useFormatDate();
    const userData = useSelector(getUserAuthData);

    const Skeleton = SkeletonRedesigned;

    const onReply = async (text: string) => {
        if (!bookReview?.id || !text.trim()) {
            return;
        }

        // TODO: manage error & loading
        const result = await dispatch(addCommentForReview({
            text,
            reviewId: bookReview.id,
        }));

        if (addCommentForReview.fulfilled.match(result)) {
            setCommentText('');
            setIsOpenReplyForm(false);
        }
    };

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!bookReview) {
        return null;
    }

    // TODO: show comment loading

    return (
        <Card padding="0" border="partial" fullWidth>
            <VStack
                data-testid="CommentCard.Content"
                gap="16"
                max
                className={classNames(cls.BookReviewCardRedesigned, {}, [
                    className,
                ])}
            >
                <HStack max justify="between" align="start" className={cls.headerRow}>
                    <AppLink to={getRouteProfile(bookReview.user.id)}>
                        <HStack gap="8" align="start" className={cls.userMeta}>
                            {bookReview.user.avatar && (
                                <Avatar
                                    size={40}
                                    src={bookReview.user.avatar}
                                />
                            )}
                            <VStack gap="4" align="start">
                                <Text text={bookReview.user.username} bold />
                                <Text
                                    text={formatDate(bookReview.createdAt)}
                                    size="s"
                                    className={cls.createdAt}
                                />
                            </VStack>
                        </HStack>
                    </AppLink>
                    <Button
                        variant="clear"
                    >
                        <StarRating
                            className={cls.stars}
                            size={20}
                            selectedStars={bookReview.rate}
                        />

                    </Button>
                </HStack>

                <Text text={bookReview.text} className={cls.reviewText} />

                <HStack gap="16">
                    <Button variant="clear" className={cls.helpful}>
                        <Text
                            text={t('helpful')}
                            size="s"
                            variant="accent"
                        />
                    </Button>

                    <hr className={cls.verticalDivider} />

                    <Button
                        variant="clear"
                        className={cls.helpful}
                        onClick={() => {
                            if (isOpenReplyForm && commentText.length > 0) {
                                setCommentText('');
                            }
                            setIsOpenReplyForm((prev) => !prev);
                        }}
                    >
                        <Text size="s" text={t('reply_review')} variant="accent" />
                    </Button>

                </HStack>

                {bookReview.comments && bookReview.comments.length > 0 &&
                <BookReviewComments comments={bookReview.comments} />}

                {isOpenReplyForm &&
                <BookReviewReplyForm
                    avatar={userData?.avatar}
                    text={commentText}
                    onReply={() => {
                        onReply(commentText);
                        setIsOpenReplyForm(false);
                    }}
                    onSetComment={setCommentText}
                    onCancel={() => {
                        setCommentText('');
                        setIsOpenReplyForm(false);
                    }}
                />}

            </VStack>
        </Card>
    );
});

import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from '@/entities/BookReview/ui/BookReviewCard/BookReviewCard.module.scss';
import MessageIcon from '@/shared/assets/icons/message.svg';
import ArrowIcon from '@/shared/assets/icons/chevron-down.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReviewComment } from '@/entities/BookReview';
import { useFormatDate } from '@/shared/lib/date/useFormatDate';

interface BookReviewCommentsProps {
    comments: ReviewComment[]
}

const BookReviewComments = memo((props: BookReviewCommentsProps) => {
    const { comments } = props;
    const [isOpenReplies, setIsOpenReplies] = useState(false);
    const { t } = useTranslation('book-details');
    const formatDate = useFormatDate();
    return (
        <>
            <hr className="divider" />
            <HStack max gap="8" justify="between">
                <HStack gap="4">
                    <Icon Svg={MessageIcon} height={16} width={16} variant="accent" />
                    <Text
                        text={t('replies_amount', { count: comments.length })}
                        variant="accent"
                    />
                </HStack>
                <Button
                    variant="clear"
                    color="accent"
                    onClick={() => setIsOpenReplies((prev) => !prev)}
                    addonRight={<Icon
                        Svg={ArrowIcon}
                        height={20}
                        width={20}
                        className={classNames(cls.arrow, {
                            [cls.arrowOpen]: isOpenReplies,
                        }, [])}
                    />}
                >
                    <Text
                        text={isOpenReplies ? t('hide_replies') : t('show_replies')}
                        variant="accent"
                    />

                </Button>
            </HStack>

            {isOpenReplies &&
                <VStack max gap="8" className={cls.reviewCommentsContainer}>
                    {comments.map((comment, index) =>
                        <HStack gap="8" max align="start" className={cls.reviewComment}>
                            {comment.user?.avatar ? (
                                <Avatar
                                    size={30}
                                    src={comment.user.avatar}
                                />
                            ) : null}
                            <VStack key={index} gap="4" max>
                                <HStack max gap="4" align="center">
                                    <Text text={comment.user.username} bold />
                                    <Text
                                        text={
                                            `${formatDate(comment.createdAt)}`
                                        }
                                        size="s"
                                        className={cls.createdAt}
                                    />
                                </HStack>
                                <Text text={comment.text} />
                            </VStack>

                        </HStack>)}
                </VStack>}

        </>
    );
});

export default BookReviewComments;

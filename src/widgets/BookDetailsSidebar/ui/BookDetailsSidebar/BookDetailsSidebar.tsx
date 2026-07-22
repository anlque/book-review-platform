import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getBookDetailsData } from '@/entities/Book';
import { getUserAuthData } from '@/entities/User';
import { AddBookReviewModal } from '@/features/addBookReview';
import { BookRating } from '@/features/bookRating';
import { BookReadingStatus, ReadingStatus, useSetReadingStatus } from '@/features/bookReadingStatus';
import ListIcon from '@/shared/assets/icons/list.svg';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import SendIcon from '@/shared/assets/icons/send.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookDetailsSidebar.module.scss';

interface BookDetailsSidebarProps {
    className?: string;
    bookId: string;
    onReviewAdded?: () => void;
}

export const BookDetailsSidebar = memo((props: BookDetailsSidebarProps) => {
    const { className, bookId, onReviewAdded } = props;
    const { t } = useTranslation('book-details');
    const user = useSelector(getUserAuthData);
    const book = useSelector(getBookDetailsData);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [setReadingStatus] = useSetReadingStatus();

    const onRecommend = useCallback(async () => {
        const url = window.location.href;
        const title = book?.title ?? document.title;

        if (navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                // TODO: what fallback??
                // clipboard fallback
            }
        }

        await navigator.clipboard.writeText(url);
    }, [book?.title]);

    // TODO: onWantToRead already exists in BookDetailsHero, can we avoid duplicates?

    const onWantToRead = useCallback(() => {
        if (!user?.id) {
            return;
        }
        setReadingStatus({
            userId: user.id,
            bookId,
            status: ReadingStatus.WANT_TO_READ,
        });
    }, [bookId, setReadingStatus, user?.id]);

    return (
        <>
            <Card
                id="book-details-rating"
                className={classNames(cls.BookDetailsSidebar, {}, [className])}
                padding="16"
                border="partial"
                max
            >
                <VStack gap="24" max>
                    <BookReadingStatus bookId={bookId} />
                    <hr className="divider" />
                    <VStack gap="8" max>
                        <Text text={t('your_rating')} size="m" bold />
                        <BookRating bookId={bookId} compact />
                    </VStack>
                    <hr className="divider" />
                    <VStack gap="8" max>
                        <Button
                            fullWidth
                            variant="clear"
                            className={cls.linkButton}
                            disabled
                            addonLeft={<Icon Svg={ListIcon} width={18} height={18} variant="currentColor" />}
                            onClick={onWantToRead}
                        >
                            <Text text={t('add_to_list')} variant="currentColor" />
                        </Button>
                        <Button
                            fullWidth
                            variant="clear"
                            className={cls.linkButton}
                            addonLeft={<Icon Svg={PencilIcon} width={18} height={18} variant="currentColor" />}
                            onClick={() => setIsReviewOpen(true)}
                        >
                            <Text text={t('write_review')} variant="currentColor" />
                        </Button>
                        <Button
                            fullWidth
                            variant="clear"
                            className={cls.linkButton}
                            addonLeft={<Icon
                                Svg={SendIcon}
                                width={18}
                                height={18}
                                variant="currentColor"
                            />}
                            onClick={onRecommend}
                        >
                            <Text text={t('recommend_book')} variant="currentColor" />
                        </Button>
                    </VStack>
                </VStack>
            </Card>
            <AddBookReviewModal
                bookId={bookId}
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                onSuccess={onReviewAdded}
            />
        </>
    );
});

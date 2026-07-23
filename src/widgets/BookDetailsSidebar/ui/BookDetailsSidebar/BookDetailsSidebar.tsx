import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookActions } from '@/features/bookActions';
import { ReadingStatus } from '@/features/bookReadingStatus';
import CurrentlyReadingIcon from '@/shared/assets/icons/book.svg';
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg';
import ListIcon from '@/shared/assets/icons/list.svg';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import SendIcon from '@/shared/assets/icons/send.svg';
import ReadIcon from '@/shared/assets/icons/tick-circle.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookDetailsSidebar.module.scss';

interface BookDetailsSidebarProps {
    className?: string;
    actions: BookActions;
}

const statuses = [
    ReadingStatus.WANT_TO_READ,
    ReadingStatus.CURRENTLY_READING,
    ReadingStatus.READ,
] as const;

const iconsMap = {
    [ReadingStatus.WANT_TO_READ]: BookmarkIcon,
    [ReadingStatus.CURRENTLY_READING]: CurrentlyReadingIcon,
    [ReadingStatus.READ]: ReadIcon,
};

export const BookDetailsSidebar = memo((props: BookDetailsSidebarProps) => {
    const { className, actions } = props;
    const { t } = useTranslation('book-details');

    return (
        <Card
            id="book-details-rating"
            className={classNames(cls.BookDetailsSidebar, {}, [className])}
            padding="16"
            border="partial"
            max
        >
            <VStack gap="24" max>
                <VStack gap="8" max>
                    <Text text={t('reading_status')} size="m" bold />
                    {statuses.map((status) => (
                        <Button
                            key={status}
                            fullWidth
                            variant={actions.readingStatus === status ? 'secondary' : 'outline'}
                            active={actions.readingStatus === status}
                            disabled={actions.isReadingStatusLoading}
                            addonLeft={<Icon
                                Svg={iconsMap[status]}
                                height={20}
                                width={20}
                            />}
                            onClick={() => actions.onReadingStatusChange(status)}
                        >
                            {t(`reading_status.${status}`)}
                        </Button>
                    ))}
                </VStack>
                <hr className="divider" />
                <VStack gap="8" max>
                    <Text text={t('your_rating')} size="m" bold />
                    <StarRating
                        size={24}
                        selectedStars={actions.userRating ?? 0}
                        onSelect={actions.onRatingChange}
                    />
                </VStack>
                <hr className="divider" />
                <VStack gap="8" max>
                    <Button
                        fullWidth
                        variant="clear"
                        className={cls.linkButton}
                        addonLeft={<Icon Svg={ListIcon} width={18} height={18} variant="currentColor" />}
                        onClick={actions.onAddToList}
                    >
                        <Text text={t('add_to_list')} variant="currentColor" />
                    </Button>
                    <Button
                        fullWidth
                        variant="clear"
                        className={cls.linkButton}
                        addonLeft={<Icon Svg={PencilIcon} width={18} height={18} variant="currentColor" />}
                        onClick={actions.onWriteReview}
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
                        onClick={actions.onRecommend}
                    >
                        <Text text={t('recommend_book')} variant="currentColor" />
                    </Button>
                </VStack>
            </VStack>
        </Card>
    );
});

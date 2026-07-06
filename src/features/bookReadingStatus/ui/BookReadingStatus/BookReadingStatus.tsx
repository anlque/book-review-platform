import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ReadingStatus } from '../../model/types/readingStatus';
import {
    useGetReadingStatus,
    useSetReadingStatus,
} from '../../api/bookReadingStatusApi';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CurrentlyReadingIcon from '@/shared/assets/icons/book.svg';
import WantToReadIcon from '@/shared/assets/icons/bookmark.svg';
import ReadIcon from '@/shared/assets/icons/tick-circle.svg';

interface BookReadingStatusProps {
    className?: string;
    bookId: string;
}

const statuses = [
    ReadingStatus.WANT_TO_READ,
    ReadingStatus.CURRENTLY_READING,
    ReadingStatus.READ,
] as const;

const iconsMap = {
    [ReadingStatus.WANT_TO_READ]: WantToReadIcon,
    [ReadingStatus.CURRENTLY_READING]: CurrentlyReadingIcon,
    [ReadingStatus.READ]: ReadIcon,
};

export const BookReadingStatus = memo((props: BookReadingStatusProps) => {
    const { className, bookId } = props;
    const { t } = useTranslation('book-details');
    const user = useSelector(getUserAuthData);
    const userId = user?.id;

    const { data: userBook } = useGetReadingStatus(
        { userId: userId ?? '', bookId },
        { skip: !userId },
    );
    const [setStatus] = useSetReadingStatus();

    const onSelect = useCallback(
        (status: ReadingStatus) => {
            if (!userId || userBook?.status === status) {
                return;
            }
            setStatus({ userId, bookId, status });
        },
        [bookId, setStatus, userId, userBook?.status],
    );

    if (!userId) {
        return null;
    }

    return (
        <VStack gap="8" max className={className}>
            <Text text={t('reading_status')} size="m" bold />
            <VStack gap="8" max>
                {statuses.map((status) => (
                    <Button
                        key={status}
                        fullWidth
                        variant={userBook?.status === status ? 'secondary' : 'outline'}
                        active={userBook?.status === status}
                        addonLeft={<Icon
                            Svg={iconsMap[status]}
                            height={20}
                            width={20}
                        />}
                        onClick={() => onSelect(status)}
                    >
                        {t(`reading_status.${status}`)}
                    </Button>
                ))}
            </VStack>
        </VStack>
    );
});

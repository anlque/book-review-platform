import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getUserAuthData, User } from '@/entities/User';
import { smallerThanLg } from '@/shared/const/mediaQuery';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookAdditionalInfo.module.scss';

interface BookAdditionalInfoProps {
    className?: string;
    submittedBy: User;
    publishedYear: string | number;
    onEdit: () => void;
}

export const BookAdditionalInfo = memo(
    (props: BookAdditionalInfoProps) => {
        const { className, submittedBy, publishedYear, onEdit } = props;
        const { t } = useTranslation('book-details');
        const isSmallerThanLg = useMediaQuery(smallerThanLg);
        const userData = useSelector(getUserAuthData);

        return (
            <VStack
                gap={isSmallerThanLg ? '8' : '24'}
                className={classNames(cls.BookAdditionalInfo, {}, [
                    className,
                ])}
            >
                <VStack gap="8">
                    <Text text={t('listed_by')} size="m" />
                    <HStack gap="8">
                        <Text text={submittedBy.username} bold />
                        <Avatar src={submittedBy.avatar} size={32} />
                    </HStack>
                </VStack>
                <VStack gap="8">
                    <Text text={t('publication_year')} size="m" />
                    <Text text={publishedYear} bold />
                </VStack>
                {userData &&
                <Button onClick={onEdit}>{t('edit')}</Button>}
            </VStack>
        );
    },
);

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BookAdditionalInfo.module.scss';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { smallerThanLg } from '@/shared/const/mediaQuery';

interface BookAdditionalInfoProps {
    className?: string;
    submittedBy: User;
    createdAt: string;
    onEdit: () => void;
}

export const BookAdditionalInfo = memo(
    (props: BookAdditionalInfoProps) => {
        const { className, submittedBy, createdAt, onEdit } = props;
        const { t } = useTranslation();
        const isSmallerThanLg = useMediaQuery(smallerThanLg);

        return (
            <VStack
                gap={isSmallerThanLg ? '8' : '32'}
                className={classNames(cls.BookAdditionalInfo, {}, [
                    className,
                ])}
            >
                <Text text={t('listed_by')} size="s" />
                <HStack gap="8">
                    {/* <Avatar src={submittedBy.avatar} size={32} /> */}
                    {/* <Text text={submittedBy.username} bold /> */}
                    <Text text={createdAt} />
                </HStack>
                <Button onClick={onEdit}>{t('edit')}</Button>
            </VStack>
        );
    },
);

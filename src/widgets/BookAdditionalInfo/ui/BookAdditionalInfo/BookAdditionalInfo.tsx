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
    author: User;
    createdAt: string;
    views: number;
    onEdit: () => void;
}

export const BookAdditionalInfo = memo(
    (props: BookAdditionalInfoProps) => {
        const { className, author, createdAt, views, onEdit } = props;
        const { t } = useTranslation();
        const isSmallerThanLg = useMediaQuery(smallerThanLg);

        return (
            <VStack
                gap={isSmallerThanLg ? '8' : '32'}
                className={classNames(cls.BookAdditionalInfo, {}, [
                    className,
                ])}
            >
                <HStack gap="8">
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                    <Text text={createdAt} />
                </HStack>
                <Button onClick={onEdit}>{t('edit')}</Button>
                <Text text={t('{{count}} views', { count: views })} />
            </VStack>
        );
    },
);

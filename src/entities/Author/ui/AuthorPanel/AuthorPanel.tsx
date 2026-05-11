import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import cls from './AuthorPanel.module.scss';
import { Author } from '../../model/types/author';

interface AuthorPanelProps {
    className?: string;
    author: Author;
}

export const AuthorPanel = memo((props: AuthorPanelProps) => {
    const { className, author } = props;

    return (
        <HStack
            gap="16"
            max
            align="start"
            className={classNames(cls.AuthorPanel, {}, [className])}
        >
            <AppImage
                src={author.portrait}
                className={cls.portrait}
                alt={author.name}
                fallback={
                    <Skeleton width={72} height={72} border="50%" />
                }
            />
            <VStack gap="8" max align="start">
                <Text title={author.name} bold />
                {author.bio ? (
                    <Text text={author.bio} size="s" />
                ) : null}
            </VStack>
        </HStack>
    );
});

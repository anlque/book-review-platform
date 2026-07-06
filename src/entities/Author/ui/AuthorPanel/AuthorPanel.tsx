import { memo } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation(['book-details', 'books-page']);

    const lifespan = [author.birthYear, author.deathYear]
        .filter(Boolean)
        .join(' – ');

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
            <VStack gap="4" max align="start">
                <Text title={t('about_author')} size="s" bold />

                <HStack gap="4">
                    <Text text={author.name} size="s" />
                    <>
                        (
                        <Text text={lifespan} size="s" className={cls.lifespan} />
                        )
                    </>
                </HStack>

                {author.bio ? (
                    <Text text={author.bio} size="s" />
                ) : null}
            </VStack>
        </HStack>
    );
});

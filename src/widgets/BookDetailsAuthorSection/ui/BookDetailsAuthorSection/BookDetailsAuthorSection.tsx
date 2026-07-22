import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AuthorPanel } from '@/entities/Author';
import {
    getBookDetailsData,
    getBookDetailsIsLoading,
} from '@/entities/Book';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookDetailsAuthorSection.module.scss';

interface BookDetailsAuthorSectionProps {
    className?: string;
}

export const BookDetailsAuthorSection = memo((props: BookDetailsAuthorSectionProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');
    const book = useSelector(getBookDetailsData);
    const isLoading = useSelector(getBookDetailsIsLoading);

    if (isLoading || !book?.author) {
        return null;
    }

    const { author } = book;
    const lifespan = [author.birthYear, author.deathYear]
        .filter(Boolean)
        .join(' – ');

    return (
        <Card
            className={classNames(cls.BookDetailsAuthorSection, {}, [className])}
            padding="16"
            border="partial"
            max
            data-testid="BookDetailsAuthorSection"
        >
            <VStack gap="16" max>
                <Text title={t('about_author')} size="l" bold />
                {lifespan && (
                    <Text text={lifespan} size="s" className={cls.lifespan} />
                )}
                <AuthorPanel author={author} />
            </VStack>
        </Card>
    );
});

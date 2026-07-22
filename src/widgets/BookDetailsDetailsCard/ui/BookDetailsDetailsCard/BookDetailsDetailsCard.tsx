import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AuthorPanel } from '@/entities/Author';
import {
    BookGenre,
    getBookDetailsData,
    getBookDetailsIsLoading,
} from '@/entities/Book';
import { getRouteAuthor } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookDetailsDetailsCard.module.scss';

interface BookDetailsDetailsCardProps {
    className?: string;
}

const genreTranslationKey = (genre: BookGenre) =>
    `types.${genre.toLowerCase()}`;

const emptyValue = '—';

export const BookDetailsDetailsCard = memo((props: BookDetailsDetailsCardProps) => {
    const { className } = props;
    const { t } = useTranslation(['book-details', 'books-page']);
    const book = useSelector(getBookDetailsData);
    const isLoading = useSelector(getBookDetailsIsLoading);

    const genreText = useMemo(() => {
        if (!book?.genres?.length) {
            return emptyValue;
        }
        return book.genres
            .filter((genre) => genre !== BookGenre.ALL)
            .map((genre) => t(genreTranslationKey(genre), { ns: 'books-page' }))
            .join(', ');
    }, [book?.genres, t]);

    if (isLoading || !book) {
        return null;
    }

    const details = [
        {
            label: t('details.first_published'),
            value: String(book.publishedYear),
        },
        { label: t('details.pages'), value: book.pages ? String(book.pages) : emptyValue },
        { label: t('details.language'), value: book.language ?? emptyValue },
        { label: t('details.genre'), value: genreText },
        { label: t('details.publisher'), value: book.publisher ?? emptyValue },
        { label: t('details.country'), value: book.country ?? emptyValue },
        { label: t('details.isbn'), value: book.isbn ?? emptyValue },
        { label: t('details.format'), value: book.format ?? emptyValue },
    ];

    return (
        <Card
            className={classNames(cls.BookDetailsDetailsCard, {}, [className])}
            padding="16"
            border="partial"
            max
            data-testid="BookDetailsDetailsCard"
        >
            <VStack gap="24" max>
                <Text title={t('details.title')} size="m" bold />
                <div className={cls.grid}>
                    {details.map((item) => (
                        <VStack key={item.label} gap="4" align="start">
                            <Text text={item.label} size="s" className={cls.label} />
                            <Text text={item.value} bold />
                        </VStack>
                    ))}
                </div>
                <div className={cls.authorSection}>
                    <AuthorPanel author={book.author} />
                    <AppLink to={getRouteAuthor(book.author.id)}>
                        <Button variant="secondary" color="accent">
                            {t('view_author_page')}
                        </Button>
                    </AppLink>
                </div>
            </VStack>
        </Card>
    );
});

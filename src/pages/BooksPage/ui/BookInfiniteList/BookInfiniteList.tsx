import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { BookList } from '@/entities/Book';
import { Text } from '@/shared/ui/deprecated/Text';
import { getBooks } from '../../model/slices/booksPageSlice';
import {
    getBooksPageError,
    getBooksPageIsLoading,
    getBooksPageView,
} from '../../model/selectors/booksPageSelectors';

interface BookInfiniteListProps {
    className?: string;
}

export const BookInfiniteList = memo((props: BookInfiniteListProps) => {
    const { className } = props;
    const books = useSelector(getBooks.selectAll);
    const isLoading = useSelector(getBooksPageIsLoading);
    const view = useSelector(getBooksPageView);
    const error = useSelector(getBooksPageError);
    const { t } = useTranslation();

    if (error) {
        return <Text text={t('load_books_error')} />;
    }

    console.log('TEST', books);
    return (
        <BookList
            isLoading={isLoading}
            view={view}
            books={books}
            className={className}
        />
    );
});

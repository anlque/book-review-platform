import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Text } from '@/shared/ui/deprecated/Text';
import { BookList } from '@/entities/Book';
import {
    getBooksPageError,
    getBooksPageIsLoading,
    getBooksPageView,
} from '../../model/selectors/booksPageSelectors';
import { getBooks } from '../../model/slices/booksPageSlice';

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

    return (
        <BookList
            isLoading={isLoading}
            view={view}
            books={books}
            className={className}
        />
    );
});

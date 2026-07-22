import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    BookGenre,
    getBookDetailsData,
    getBookDetailsIsLoading,
} from '@/entities/Book';
import { useBookFilters } from '@/pages/BooksPage/lib/hooks/useBookFilters';
import ChevronIcon from '@/shared/assets/icons/chevron-down.svg';
import {
    getRouteBooks,
} from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from './BookDetailsBreadcrumbs.module.scss';

interface BookDetailsBreadcrumbsProps {
    className?: string;
}

const genreTranslationKey = (genre: BookGenre) =>
    `types.${genre.toLowerCase()}`;

export const BookDetailsBreadcrumbs = memo((props: BookDetailsBreadcrumbsProps) => {
    const { className } = props;
    const { t } = useTranslation(['book-details', 'books-page']);
    const book = useSelector(getBookDetailsData);
    const isLoading = useSelector(getBookDetailsIsLoading);
    const {
        onChangeGenres,
    } = useBookFilters();

    const primaryGenre = useMemo(
        () => book?.genres?.find((genre) => genre !== BookGenre.ALL),
        [book?.genres],
    );

    if (isLoading || !book) {
        return null;
    }

    const genreLabel = primaryGenre
        ? t(genreTranslationKey(primaryGenre), { ns: 'books-page' })
        : null;

    const genreLink = primaryGenre
        ? `${getRouteBooks()}?genres=${primaryGenre}`
        : null;

    const onChangeGenre = () => {
        if (!primaryGenre) {
            return;
        }
        onChangeGenres(primaryGenre);
    };

    return (
        <nav
            className={classNames(cls.BookDetailsBreadcrumbs, {}, [className])}
            aria-label={t('breadcrumbs.label', { ns: 'book-details' })}
            data-testid="BookDetailsBreadcrumbs"
        >
            <AppLink to={getRouteBooks()} className={cls.link}>
                {t('breadcrumbs.books', { ns: 'book-details' })}
            </AppLink>
            {genreLabel && genreLink && (
                <>
                    <Icon height={18} width={18} Svg={ChevronIcon} className={cls.separator} />
                    <AppLink to={genreLink} onClick={onChangeGenre} className={cls.link}>
                        {genreLabel}
                    </AppLink>
                </>
            )}
            <Icon height={18} width={18} Svg={ChevronIcon} className={cls.separator} />
            <span className={cls.current}>{book.title}</span>
        </nav>
    );
});

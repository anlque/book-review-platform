import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import cls from './BooksPageFilters.module.scss';

import { BookSortSelector } from '@/features/BookSortSelector';
import { BookViewSelector } from '@/features/BookViewSelector';
import { BookTypeTabs } from '@/features/BookTypeTabs';
import { useBookFilters } from '../../lib/hooks/useBookFilters';

interface BooksPageFiltersProps {
    className?: string;
}

export const BooksPageFilters = memo((props: BooksPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        onChangeSort,
        onChangeGenres,
        sort,
        genres,
        onChangeSearch,
        search,
        onChangeView,
        view,
        onChangeOrder,
        order,
    } = useBookFilters();

    return (
        <div className={classNames(cls.BooksPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <BookSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <BookViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('search')}
                />
            </Card>
            <BookTypeTabs
                value={genres}
                onChangeGenres={onChangeGenres}
                className={cls.tabs}
            />
        </div>
    );
});

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BooksFilters.module.scss';
import { Card } from '@/shared/ui/redesigned/Card';
import { BookSortSelector } from '@/features/BookSortSelector';
import { BookTypeTabs } from '@/features/BookTypeTabs';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { BookSortField, BookType } from '@/entities/Book';
import { SortOrder } from '@/shared/types/sort';
import { Input } from '@/shared/ui/redesigned/Input';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface BooksFiltersProps {
    className?: string;
    sort: BookSortField;
    order: SortOrder;
    type: BookType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: BookSortField) => void;
    onChangeType: (type: BookType) => void;
}

export const BooksFilters = memo((props: BooksFiltersProps) => {
    const {
        className,
        onChangeType,
        onChangeSearch,
        search,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
        type,
    } = props;
    const { t } = useTranslation('books-page');

    return (
        <Card
            className={classNames(cls.BooksFilters, {}, [className])}
            padding="16"
        >
            <VStack gap="32">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    size="s"
                    placeholder={t('search')}
                    addonLeft={<Icon Svg={SearchIcon} />}
                />
                <BookTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                    className={cls.tabs}
                />
                <BookSortSelector
                    order={order}
                    sort={sort}
                    listClassName={cls.tabs}
                    className={cls.tabs}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
            </VStack>
        </Card>
    );
});

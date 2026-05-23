import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import cls from './BookSortSelector.module.scss';
import { BookSortField } from '@/entities/Book';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface BookSortSelectorProps {
    className?: string;
    listClassName?: string;
    sort: BookSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: BookSortField) => void;
}

export const BookSortSelector = memo((props: BookSortSelectorProps) => {
    const { className, listClassName, onChangeOrder, onChangeSort, order, sort } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('asc'),
            },
            {
                value: 'desc',
                content: t('desc'),
            },
        ],
        [t],
    );

    // TODO: sort by author name
    const sortFieldOptions = useMemo<SelectOption<BookSortField>[]>(
        () => [
            {
                value: BookSortField.AUTHOR,
                content: t('author'),
            },
            {
                value: BookSortField.TITLE,
                content: t('title'),
            },
        ],
        [t],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(
                        cls.BookSortSelector,
                        {},
                        [className],
                    )}
                >
                    <VStack gap="8" className={listClassName}>
                        <Text text={t('sort_by')} />
                        <ListBox
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />
                        <ListBox
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
                        />
                    </VStack>
                </div>
            }
            off={
                <div
                    className={classNames(cls.BookSortSelector, {}, [
                        className,
                    ])}
                >
                    <Select<BookSortField>
                        options={sortFieldOptions}
                        label={t('sort_by')}
                        value={sort}
                        onChange={onChangeSort}
                    />
                    <Select
                        options={orderOptions}
                        label={t('by')}
                        value={order}
                        onChange={onChangeOrder}
                        className={cls.order}
                    />
                </div>
            }
        />
    );
});

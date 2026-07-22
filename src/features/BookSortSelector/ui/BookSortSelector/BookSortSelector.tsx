import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookSortField } from '@/entities/Book';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookSortSelector.module.scss';

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
    );
});

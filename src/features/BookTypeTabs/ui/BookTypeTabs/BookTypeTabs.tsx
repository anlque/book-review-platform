import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { BookType } from '@/entities/Book';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface BookTypeTabsProps {
    className?: string;
    value: BookType;
    onChangeType: (type: BookType) => void;
}

export const BookTypeTabs = memo((props: BookTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation('books-page');

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: BookType.ALL,
                content: t('types.all'),
            },
            {
                value: BookType.FANTASY,
                content: t('types.fantasy'),
            },
            {
                value: BookType.SCIENCE_FICTION,
                content: t('types.science_fiction'),
            },
            {
                value: BookType.ROMANCE,
                content: t('types.romance'),
            },
            {
                value: BookType.CYBERPUNK,
                content: t('types.cyberpunk'),
            },
            {
                value: BookType.DETECTIVE,
                content: t('types.detective'),
            },
            {
                value: BookType.HORROR,
                content: t('types.horror'),
            },
            {
                value: BookType.MYSTERY,
                content: t('types.mystery'),
            },
            {
                value: BookType.THRILLER,
                content: t('types.thriller'),
            },
            {
                value: BookType.NOVEL,
                content: t('types.novel'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as BookType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    );
});

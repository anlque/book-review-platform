import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { BookGenre } from '@/entities/Book';
import { ToggleFeatures } from '@/shared/lib/features';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface BookTypeTabsProps {
    className?: string;
    value: BookGenre;
    onChangeGenres: (type: BookGenre) => void;
}

export const BookTypeTabs = memo((props: BookTypeTabsProps) => {
    const { className, value, onChangeGenres } = props;
    const { t } = useTranslation('books-page');

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: BookGenre.ALL,
                content: t('types.all'),
            },
            {
                value: BookGenre.FANTASY,
                content: t('types.fantasy'),
            },
            {
                value: BookGenre.SCIENCE_FICTION,
                content: t('types.science_fiction'),
            },
            {
                value: BookGenre.ROMANCE,
                content: t('types.romance'),
            },
            {
                value: BookGenre.CYBERPUNK,
                content: t('types.cyberpunk'),
            },
            {
                value: BookGenre.DETECTIVE,
                content: t('types.detective'),
            },
            {
                value: BookGenre.HORROR,
                content: t('types.horror'),
            },
            {
                value: BookGenre.MYSTERY,
                content: t('types.mystery'),
            },
            {
                value: BookGenre.THRILLER,
                content: t('types.thriller'),
            },
            {
                value: BookGenre.NOVEL,
                content: t('types.novel'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeGenres(tab.value as BookGenre);
        },
        [onChangeGenres],
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

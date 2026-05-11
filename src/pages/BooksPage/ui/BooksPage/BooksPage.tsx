import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import cls from './BooksPage.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { smallerThanLg } from '@/shared/const/mediaQuery';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';

import { BookInfiniteList } from '../BookInfiniteList/BookInfiniteList';
import { BooksPageFilters } from '../BooksPageFilters/BooksPageFilters';
import { fetchNextBooksPage } from '../../model/services/fetchNextBooksPage/fetchNextBooksPage';
import { initBooksPage } from '../../model/services/initBooksPage/initBooksPage';
import { booksPageReducer } from '../../model/slices/booksPageSlice';
import { BookPageGreeting } from '@/features/bookPageGreeting';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface BooksPageProps {
    className?: string;
}

const reducers: ReducersList = {
    booksPage: booksPageReducer,
};

const BooksPage = (props: BooksPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const isSmallerThanLg = useMediaQuery(smallerThanLg);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextBooksPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initBooksPage(searchParams));
    });

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    left={
                        <>
                            <ViewSelectorContainer />
                            {isSmallerThanLg && (
                                <div className={cls.avatarBlock}>
                                    <NotificationButton />
                                    <AvatarDropdown />
                                </div>
                            )}
                        </>
                    }
                    right={<FiltersContainer />}
                    className={cls.layout}
                    content={
                        <Page
                            data-testid="BooksPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames(cls.BooksPage, {}, [className])}
                        >
                            <BookInfiniteList className={cls.list} />
                            <BookPageGreeting />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    data-testid="BooksPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.BooksPage, {}, [className])}
                >
                    <BooksPageFilters />
                    <BookInfiniteList className={cls.list} />
                    <BookPageGreeting />
                </Page>
            }
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(BooksPage);

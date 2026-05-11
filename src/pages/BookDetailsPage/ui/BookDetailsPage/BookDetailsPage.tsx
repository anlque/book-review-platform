import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { BookRecommendationsList } from '@/features/bookRecommendationsList';
import cls from './BookDetailsPage.module.scss';
import { bookDetailsPageReducer } from '../../model/slices';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { BookRating } from '@/features/bookRating';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';

import { BookDetailsComments } from '../BookDetailsComments/BookDetailsComments';
import { BookDetailsPageHeader } from '../BookDetailsPageHeader/BookDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface BookDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    bookDetailsPage: bookDetailsPageReducer,
};

const BookDetailsPage = (props: BookDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        className={cls.layout}
                        content={
                            <Page
                                className={classNames(
                                    cls.BookDetailsPage,
                                    {},
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <BookRating bookId={id} />
                                    <BookRecommendationsList />
                                    <BookDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={
                    <Page
                        className={classNames(cls.BookDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <BookDetailsPageHeader />
                            <DetailsContainer />
                            <ToggleFeatures
                                feature="isBookRatingEnabled"
                                on={<BookRating bookId={id} />}
                                off={<Card>{t('feedback_appear_soon')}</Card>}
                            />
                            <BookRecommendationsList />
                            <BookDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(BookDetailsPage);

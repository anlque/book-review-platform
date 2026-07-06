import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './BookDetailsPage.module.scss';
import { bookDetailsPageReducer } from '../../model/slices';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { BookDetailsToolbar } from '@/widgets/BookDetailsToolbar';
import { BookDetailsHero } from '@/widgets/BookDetailsHero';
import { BookDetailsContentRow } from '@/widgets/BookDetailsContentRow';
import { BookDetailsDetailsCard } from '@/widgets/BookDetailsDetailsCard';
import { BookDetailsComments } from '../BookDetailsComments/BookDetailsComments';
import { BookDetailsPageHeader } from '../BookDetailsPageHeader/BookDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { BookRating } from '@/features/bookRating';
import {
    bookDetailsReducer,
    fetchBookById,
} from '@/entities/Book';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchReviewsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';

interface BookDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    bookDetailsPage: bookDetailsPageReducer,
    bookDetails: bookDetailsReducer,
};

const BookDetailsPage = (props: BookDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        if (__PROJECT__ !== 'storybook' && id) {
            dispatch(fetchBookById(id));
        }
    });

    const onReviewAdded = useCallback(() => {
        if (id) {
            dispatch(fetchReviewsByBookId(id));
        }
    }, [dispatch, id]);

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Page
                        className={classNames(
                            cls.BookDetailsPage,
                            {},
                            [className],
                        )}
                    >
                        <VStack gap="24" max>
                            <BookDetailsToolbar bookId={id} />
                            <BookDetailsHero
                                bookId={id}
                                onReviewAdded={onReviewAdded}
                            />
                            <BookDetailsContentRow bookId={id} />
                            <BookDetailsDetailsCard />
                            <BookDetailsComments
                                id={id}
                                onReviewAdded={onReviewAdded}
                            />
                        </VStack>
                    </Page>
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
                            <BookDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(BookDetailsPage);

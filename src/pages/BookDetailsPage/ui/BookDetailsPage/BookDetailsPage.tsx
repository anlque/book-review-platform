import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import {
    bookDetailsReducer,
    fetchBookById,
} from '@/entities/Book';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { BookDetailsContentRow } from '@/widgets/BookDetailsContentRow';
import { BookDetailsDetailsCard } from '@/widgets/BookDetailsDetailsCard';
import { BookDetailsHero } from '@/widgets/BookDetailsHero';
import { BookDetailsToolbar } from '@/widgets/BookDetailsToolbar';
import { Page } from '@/widgets/Page';
import { fetchReviewsByBookId } from '../../model/services/fetchReviewsByBookId/fetchReviewsByBookId';
import { bookDetailsPageReducer } from '../../model/slices';
import { BookDetailsComments } from '../BookDetailsComments/BookDetailsComments';
import cls from './BookDetailsPage.module.scss';

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
        </DynamicModuleLoader>
    );
};

export default memo(BookDetailsPage);

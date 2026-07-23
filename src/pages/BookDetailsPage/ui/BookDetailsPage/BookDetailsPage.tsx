import { memo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    bookDetailsReducer,
    fetchBookById,
} from '@/entities/Book';
import { AddBookReviewModal } from '@/features/addBookReview';
import { useBookActions } from '@/features/bookActions';
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
import { MobileBookPageControls } from '../MobileBookPageControls/MobileBookPageControls';
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
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const [activeMobileOverlay, setActiveMobileOverlay] = useState<
        'navigation' | 'status' | 'rating' | 'more' | null
    >(null);
    const { actions, isReviewOpen, closeReview } = useBookActions(id ?? '');

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
            <MobileBookPageControls
                activeOverlay={activeMobileOverlay}
                setActiveOverlay={setActiveMobileOverlay}
                actions={actions}
            />
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
                        actions={actions}
                    />
                    <BookDetailsContentRow bookId={id} />
                    <BookDetailsDetailsCard />
                    <BookDetailsComments
                        id={id}
                        onReviewAdded={onReviewAdded}
                    />
                </VStack>
            </Page>
            <AddBookReviewModal
                bookId={id}
                isOpen={isReviewOpen}
                onClose={closeReview}
                onSuccess={onReviewAdded}
            />
        </DynamicModuleLoader>
    );
};

export default memo(BookDetailsPage);

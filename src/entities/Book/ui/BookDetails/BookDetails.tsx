import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import {
    getBookDetailsData,
    getBookDetailsError,
    getBookDetailsIsLoading,
} from '../../model/selectors/bookDetails';
import { fetchBookById } from '../../model/services/fetchBookById/fetchBookById';
import { bookDetailsReducer } from '../../model/slice/bookDetailsSlice';
import cls from './BookDetails.module.scss';
import { renderBookBlock } from './renderBlock';

interface BookDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    bookDetails: bookDetailsReducer,
};

const Redesigned = () => {
    const book = useSelector(getBookDetailsData);

    if (!book) {
        return null;
    }

    // TODO:
    const imageBlocks = [] as any;

    if (!imageBlocks.length) {
        return null;
    }

    return (
        <>
            {imageBlocks.map(renderBookBlock)}
        </>
    );
};

export const BookDetailsSkeleton = () => {
    const Skeleton = SkeletonRedesigned;
    return (
        <VStack gap="16" max>
            <Skeleton
                className={cls.avatar}
                width={200}
                height={200}
                border="50%"
            />
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.skeleton} width={600} height={24} />
            <Skeleton className={cls.skeleton} width="100%" height={200} />
            <Skeleton className={cls.skeleton} width="100%" height={200} />
        </VStack>
    );
};

export const BookDetails = memo((props: BookDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('book-details');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getBookDetailsIsLoading);
    const error = useSelector(getBookDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchBookById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = null;
    } else if (error) {
        content = (
            <Text
                align="center"
                title={t('loading_error')}
            />
        );
    } else {
        content = (
            <Redesigned />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                max
                className={classNames(cls.BookDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});

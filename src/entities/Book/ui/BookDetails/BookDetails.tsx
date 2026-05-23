import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Text as TextDeprecated,
    TextAlign,
    TextSize,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import CalendarIcon from '@/shared/assets/icons/calendar.svg';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { fetchBookById } from '../../model/services/fetchBookById/fetchBookById';
import { bookDetailsReducer } from '../../model/slice/bookDetailsSlice';
import cls from './BookDetails.module.scss';
import {
    getBookDetailsData,
    getBookDetailsError,
    getBookDetailsIsLoading,
} from '../../model/selectors/bookDetails';
import { renderBookBlock } from './renderBlock';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AuthorPanel } from '@/entities/Author';

interface BookDetailsProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    bookDetails: bookDetailsReducer,
};

const Deprecated = () => {
    const book = useSelector(getBookDetailsData);
    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <Avatar size={200} src={book?.img} className={cls.avatar} />
            </HStack>
            <VStack gap="4" max data-testid="BookDetails.Info">
                <TextDeprecated
                    className={cls.title}
                    title={book?.title}
                    text={book?.subtitle}
                    size={TextSize.L}
                />
                {book?.author ? (
                    <AuthorPanel author={book.author} className={cls.author} />
                ) : null}
                <HStack gap="8" className={cls.bookInfo}>
                    <Icon className={cls.icon} Svg={EyeIcon} />
                </HStack>
                <HStack gap="8" className={cls.bookInfo}>
                    <Icon className={cls.icon} Svg={CalendarIcon} />
                    <TextDeprecated text={`${book?.publishedYear}`} />
                </HStack>
            </VStack>
            {book?.blocks.map(renderBookBlock)}
        </>
    );
};

const Redesigned = () => {
    const book = useSelector(getBookDetailsData);

    return (
        <>
            <AppImage
                fallback={
                    <SkeletonRedesigned
                        width="100%"
                        height={420}
                        border="16px"
                    />
                }
                src={book?.img}
                className={cls.img}
            />
            <Text title={book?.title} size="l" bold />
            <Text title={book?.subtitle} />
            {book?.author ? (
                <AuthorPanel author={book.author} className={cls.author} />
            ) : null}
            {book?.blocks.map(renderBookBlock)}
        </>
    );
};

export const BookDetailsSkeleton = () => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
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
        content = <BookDetailsSkeleton />;
    } else if (error) {
        content = (
            <TextDeprecated
                align={TextAlign.CENTER}
                title={t('loading_error')}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Redesigned />}
                off={<Deprecated />}
            />
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

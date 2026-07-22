import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthorPanel } from '@/entities/Author';
import { BookList } from '@/entities/Book';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import {
    getAuthorDetailsData,
    getAuthorDetailsError,
    getAuthorDetailsIsLoading,
} from '../../model/selectors/authorDetails';
import { fetchAuthorDetails } from '../../model/services/fetchAuthorDetails/fetchAuthorDetails';
import { authorDetailsReducer } from '../../model/slices/authorDetailsSlice';
import cls from './AuthorPage.module.scss';

const reducers: ReducersList = {
    authorDetails: authorDetailsReducer,
};

const AuthorPage = memo(() => {
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation('book-details');
    const dispatch = useAppDispatch();
    const author = useSelector(getAuthorDetailsData);
    const isLoading = useSelector(getAuthorDetailsIsLoading);
    const error = useSelector(getAuthorDetailsError);

    useEffect(() => {
        if (id) {
            dispatch(fetchAuthorDetails(id));
        }
    }, [dispatch, id]);

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={cls.AuthorPage}>
                <VStack gap="24" max>
                    {isLoading && <Skeleton width="100%" height={200} />}
                    {error && <Text title={t('loading_error')} />}
                    {author && (
                        <>
                            <AuthorPanel author={author} />
                            <Text title={t('author_books')} size="l" bold />
                            <BookList books={author.books} />
                        </>
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default AuthorPage;

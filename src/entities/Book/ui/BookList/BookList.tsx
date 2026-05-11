import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { BookListItemSkeleton } from '../BookListItem/BookListItemSkeleton';
import { BookListItem } from '../BookListItem/BookListItem';
import cls from './BookList.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Book } from '../../model/types/book';
import { BookView } from '../../model/consts/bookConsts';

interface BookListProps {
    className?: string;
    books: Book[];
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    view?: BookView;
}

const getSkeletons = (view: BookView) =>
    new Array(view === BookView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <BookListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

// TODO: virtualize
//  check storybook
// add notifications to db json
//  add admin user
//  notifications list remove device detect, use screen size hook

export const BookList = memo((props: BookListProps) => {
    const {
        className,
        books,
        view = BookView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();
    console.log('BOOKS', books);

    if (!isLoading && !books.length) {
        return (
            <div
                className={classNames(cls.BookList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={TextSize.L} title={t('books_not_found')} />
            </div>
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.BookListRedesigned, {}, [])}
                    data-testid="BookList"
                >
                    {books.map((item) => (
                        <BookListItem
                            book={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                <div
                    className={classNames(cls.BookList, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="BookList"
                >
                    {books.map((item) => (
                        <BookListItem
                            book={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </div>
            }
        />
    );
});

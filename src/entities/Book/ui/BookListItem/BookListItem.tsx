import { HTMLAttributeAnchorTarget, memo } from 'react';
import { BookView } from '../../model/consts/bookConsts';
import { Book } from '../../model/types/book';
import { BookListItemRedesigned } from './BookListItemRedesigned/BookListItemRedesigned';

export interface BookListItemProps {
    className?: string;
    book: Book;
    view: BookView;
    target?: HTMLAttributeAnchorTarget;
}

export const BookListItem = memo((props: BookListItemProps) => {
    return (
        <BookListItemRedesigned {...props} />
    );
});

import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { BookListItemDeprecated } from './BookListItemDeprecated/BookListItemDeprecated';
import { BookListItemRedesigned } from './BookListItemRedesigned/BookListItemRedesigned';
import { Book } from '../../model/types/book';
import { BookView } from '../../model/consts/bookConsts';

export interface BookListItemProps {
    className?: string;
    book: Book;
    view: BookView;
    target?: HTMLAttributeAnchorTarget;
}

export const BookListItem = memo((props: BookListItemProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={<BookListItemRedesigned {...props} />}
            off={<BookListItemDeprecated {...props} />}
        />
    );
});

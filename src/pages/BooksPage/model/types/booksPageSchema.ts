import { EntityState } from '@reduxjs/toolkit';
import {
    Book,
    BookView,
    BookSortField,
    BookGenre,
} from '@/entities/Book';
import { SortOrder } from '@/shared/types/sort';

export interface BooksPageSchema extends EntityState<Book, Book['id']> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    // filters
    view: BookView;
    order: SortOrder;
    sort: BookSortField;
    search: string;
    genres: BookGenre;

    _inited: boolean;
}

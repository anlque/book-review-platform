import { StateSchema } from '@/app/providers/StoreProvider';
import { BookSortField, BookGenre, BookView } from '@/entities/Book';
import { buildSelector } from '@/shared/lib/store';

export const getBooksPageIsLoading = (state: StateSchema) =>
    state.booksPage?.isLoading || false;
export const getBooksPageError = (state: StateSchema) => state.booksPage?.error;
export const getBooksPageView = (state: StateSchema) =>
    state.booksPage?.view || BookView.SMALL;
export const getBooksPageNum = (state: StateSchema) => state.booksPage?.page || 1;
export const getBooksPageLimit = (state: StateSchema) =>
    state.booksPage?.limit || 9;
export const getBooksPageHasMore = (state: StateSchema) => state.booksPage?.hasMore;
export const getBooksPageInited = (state: StateSchema) => state.booksPage?._inited;
export const getBooksPageOrder = (state: StateSchema) =>
    state.booksPage?.order ?? 'asc';
export const getBooksPageSort = (state: StateSchema) =>
    state.booksPage?.sort ?? BookSortField.TITLE;
export const getBooksPageSearch = (state: StateSchema) =>
    state.booksPage?.search ?? '';
export const getBooksPageGenres = (state: StateSchema) =>
    state.booksPage?.genres ?? BookGenre.ALL;

export const [useBookItemById] = buildSelector(
    (state, id: string) => state.booksPage?.entities[id],
);

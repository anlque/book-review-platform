import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import {
    Book,
    BookGenre,
    BookView,
    BookSortField,
} from '@/entities/Book';
import { BOOKS_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { SortOrder } from '@/shared/types/sort';
import { BooksPageSchema } from '../types/booksPageSchema';
import { fetchBooksList } from '../services/fetchBooksList/fetchBooksList';

const booksAdapter = createEntityAdapter({
    selectId: (book: Book) => book.id,
});

export const getBooks = booksAdapter.getSelectors<StateSchema>(
    (state) => state.booksPage || booksAdapter.getInitialState(),
);

const booksPageSlice = createSlice({
    name: 'booksPageSlice',
    initialState: booksAdapter.getInitialState<BooksPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: BookView.SMALL,
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        sort: BookSortField.TITLE,
        search: '',
        order: 'asc',
        genres: BookGenre.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<BookView>) => {
            state.view = action.payload;
            localStorage.setItem(
                BOOKS_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setSort: (state, action: PayloadAction<BookSortField>) => {
            state.sort = action.payload;
        },
        setType: (state, action: PayloadAction<BookGenre>) => {
            state.genres = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(
                BOOKS_VIEW_LOCALSTORAGE_KEY,
            ) as BookView;
            state.view = view;
            state.limit = view === BookView.BIG ? 4 : 9;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooksList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    booksAdapter.removeAll(state);
                }
            })
            .addCase(fetchBooksList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;

                if (action.meta.arg.replace) {
                    booksAdapter.setAll(state, action.payload);
                } else {
                    booksAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchBooksList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: booksPageReducer, actions: booksPageActions } =
    booksPageSlice;

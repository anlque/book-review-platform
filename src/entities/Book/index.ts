export { BookDetailsSkeleton } from './ui/BookDetails/BookDetails';

export { BookDetails } from './ui/BookDetails/BookDetails';

export type { Book } from './model/types/book';

export type { BookDetailsSchema } from './model/types/bookDetailsSchema';

export {
    BookGenre,
    BookSortField, BookView,
} from './model/consts/bookConsts';
export {
    getBookDetailsData,
    getBookDetailsError,
    getBookDetailsIsLoading,
} from './model/selectors/bookDetails';
export { fetchBookById } from './model/services/fetchBookById/fetchBookById';
export { bookDetailsReducer } from './model/slice/bookDetailsSlice';
export { BookList } from './ui/BookList/BookList';

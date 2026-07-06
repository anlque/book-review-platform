export { BookDetailsSkeleton } from './ui/BookDetails/BookDetails';

export { BookDetails } from './ui/BookDetails/BookDetails';

export type { Book } from './model/types/book';

export type { BookDetailsSchema } from './model/types/bookDetailsSchema';

export { BookList } from './ui/BookList/BookList';
export {
    getBookDetailsData,
    getBookDetailsError,
    getBookDetailsIsLoading,
} from './model/selectors/bookDetails';
export { fetchBookById } from './model/services/fetchBookById/fetchBookById';
export { bookDetailsReducer } from './model/slice/bookDetailsSlice';
export {
    BookView,
    BookGenre,
    BookSortField,
} from './model/consts/bookConsts';

import { Book } from './book';

export interface BookDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: Book;
}

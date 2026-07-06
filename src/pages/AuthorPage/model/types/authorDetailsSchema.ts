import { Author } from '@/entities/Author';
import { Book } from '@/entities/Book';

export interface AuthorWithBooks extends Author {
    books: Book[];
}

export interface AuthorDetailsSchema {
    data?: AuthorWithBooks;
    isLoading: boolean;
    error?: string;
}

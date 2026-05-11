import { Book } from '@/entities/Book';

export interface Author {
    id: string;
    name: string;
    books: Book[];
    bio?: string;
    portrait?: string;
}

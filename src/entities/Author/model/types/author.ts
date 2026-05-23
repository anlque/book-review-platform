import { Book } from '@/entities/Book';

export interface Author {
    id: string;
    name: string;
    birthYear: number,
    books?: Book[];
    deathYear?: number,
    bio?: string;
    portrait?: string;
}

import { Author } from '@/entities/Author';
import { User } from '@/entities/User';
import { BookGenre } from '../consts/bookConsts';

// TODO: add slug

export interface BookBlock {
    id: string;
    paragraphs: string[];
    title?: string;
}

export interface Book {
    id: string;
    title: string;
    user: User;
    author: Author;
    subtitle: string;
    img: string;
    publishedYear: number;
    genres: BookGenre[];
    blocks: BookBlock[];
    label?: string;
    pages?: number;
    language?: string;
    publisher?: string;
    country?: string;
    isbn?: string;
    format?: string;
}

import { Author } from '@/entities/Author';
import { User } from '@/entities/User';
import { BookBlockType, BookType } from '../consts/bookConsts';

export interface BookBlockBase {
    id: string;
    type: BookBlockType;
}

export interface BookImageBlock extends BookBlockBase {
    type: BookBlockType.IMAGE;
    src: string;
    title: string;
}

export interface BookTextBlock extends BookBlockBase {
    type: BookBlockType.TEXT;
    paragraphs: string[];
    title?: string;
}

export type BookBlock = BookImageBlock | BookTextBlock;

export interface Book {
    id: string;
    title: string;
    user: User;
    author: Author;
    subtitle: string;
    img: string;
    createdAt: string;
    type: BookType[];
    blocks: BookBlock[];
}

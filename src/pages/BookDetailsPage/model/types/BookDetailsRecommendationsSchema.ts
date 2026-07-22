import { EntityState } from '@reduxjs/toolkit';
import { Book } from '@/entities/Book';

export interface BookDetailsRecommendationsSchema
    extends EntityState<Book, Book['id']> {
    isLoading?: boolean;
    error?: string;
}

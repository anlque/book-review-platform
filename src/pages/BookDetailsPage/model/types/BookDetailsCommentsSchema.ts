import { EntityState } from '@reduxjs/toolkit';
import { Comment } from '@/entities/Comment';

export interface BookDetailsCommentsSchema
    extends EntityState<Comment, Comment['id']> {
    isLoading?: boolean;
    error?: string;
}


import { User } from '@/entities/User';

export interface ReviewComment {
    id: string,
    text: string,
    reviewId: string,
    bookId: string;
    userId: string,
    createdAt: string,
    user: User
}

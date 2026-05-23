import { User } from '@/entities/User';
import { ReviewComment } from './reviewComment';

export interface BookReview {
    id: string,
    user: User;
    rate: number,
    text: string,
    userId: string,
    bookId: string,
    createdAt: string
    comments?: ReviewComment[];
}

import { lazy, Suspense } from 'react';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { BookRatingProps } from './BookRating';

const BookRatingLazy = lazy(() => import('./BookRating'));

export const BookRatingAsync = (props: BookRatingProps) => {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <BookRatingLazy {...props} />
        </Suspense>
    );
};

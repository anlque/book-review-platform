import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getBookDetailsData } from '@/entities/Book';
import { getUserAuthData } from '@/entities/User';
import { useGetBookRating, useRateBook } from '@/features/bookRating/api/bookRatingApi';
import {
    ReadingStatus,
    useGetReadingStatus,
    useSetReadingStatus,
} from '@/features/bookReadingStatus';
import { BookActions } from '../types/bookActions';

interface UseBookActionsResult {
    actions: BookActions;
    isReviewOpen: boolean;
    closeReview: () => void;
}

export const useBookActions = (bookId: string): UseBookActionsResult => {
    const user = useSelector(getUserAuthData);
    const book = useSelector(getBookDetailsData);
    const userId = user?.id;
    const [readingStatusError, setReadingStatusError] = useState<string>();
    const [ratingError, setRatingError] = useState<string>();
    const [readingStatus, setReadingStatusValue] = useState<ReadingStatus | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [isReviewOpen, setIsReviewOpen] = useState(false);

    const { data: userBook, isFetching: isStatusFetching } =
        useGetReadingStatus(
            { userId: userId ?? '', bookId },
            { skip: !userId || !bookId },
        );
    const { data: rating, isFetching: isRatingFetching } = useGetBookRating(
        { userId: userId ?? '', bookId },
        { skip: !userId || !bookId },
    );

    const [setReadingStatus, { isLoading: isStatusSaving }] =
        useSetReadingStatus();
    const [rateBook, { isLoading: isRatingSaving }] = useRateBook();

    useEffect(() => {
        setReadingStatusValue(userBook?.status ?? null);
    }, [userBook?.status]);

    useEffect(() => {
        setUserRating(rating?.rate ?? null);
    }, [rating?.rate]);

    const shareBook = useCallback(async () => {
        const url = window.location.href;
        const title = book?.title ?? document.title;

        if (navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                // Fall back to clipboard below.
            }
        }

        await navigator.clipboard.writeText(url);
    }, [book?.title]);

    const onReadingStatusChange = useCallback(
        async (status: ReadingStatus) => {
            if (!userId || !bookId || userBook?.status === status) {
                return;
            }

            setReadingStatusError(undefined);

            try {
                await setReadingStatus({ userId, bookId, status }).unwrap();
                setReadingStatusValue(status);
            } catch {
                setReadingStatusError('Unable to update reading status');
            }
        },
        [bookId, setReadingStatus, userBook?.status, userId],
    );

    const onRatingChange = useCallback(
        async (rate: number) => {
            if (!userId || !bookId) {
                return;
            }

            setRatingError(undefined);

            try {
                await rateBook({ userId, bookId, rate }).unwrap();
                setUserRating(rate);
            } catch {
                setRatingError('Unable to update rating');
            }
        },
        [bookId, rateBook, userId],
    );

    const onAddToList = useCallback(async () => {
        await onReadingStatusChange(ReadingStatus.WANT_TO_READ);
    }, [onReadingStatusChange]);

    const onWriteReview = useCallback(() => {
        setIsReviewOpen(true);
    }, []);

    return {
        actions: {
            readingStatus,
            userRating,
            isReadingStatusLoading: isStatusFetching || isStatusSaving,
            isRatingLoading: isRatingFetching || isRatingSaving,
            readingStatusError,
            ratingError,
            onReadingStatusChange,
            onRatingChange,
            onAddToList,
            onWriteReview,
            onRecommend: shareBook,
            onShare: shareBook,
        },
        isReviewOpen,
        closeReview: () => setIsReviewOpen(false),
    };
};

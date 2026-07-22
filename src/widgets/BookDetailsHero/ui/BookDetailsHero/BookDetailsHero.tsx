import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthorInline } from '@/entities/Author';
import {
    BookDetailsSkeleton,
    BookGenre,
    fetchBookById,
    getBookDetailsData,
    getBookDetailsError,
    getBookDetailsIsLoading,
} from '@/entities/Book';
import { getUserAuthData, isUserAdmin } from '@/entities/User';
import { useGetBookReviewStats } from '@/features/bookDetailsStats';
import { ReadingStatus, useSetReadingStatus } from '@/features/bookReadingStatus';
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import { getRouteBookEdit } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Badge } from '@/shared/ui/redesigned/Badge/Badge';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookDetailsSidebar } from '@/widgets/BookDetailsSidebar';
import cls from './BookDetailsHero.module.scss';

interface BookDetailsHeroProps {
    className?: string;
    bookId: string;
    onReviewAdded?: () => void;
}

const genreTranslationKey = (genre: BookGenre) =>
    `types.${genre.toLowerCase()}`;

export const BookDetailsHero = memo((props: BookDetailsHeroProps) => {
    const { className, bookId, onReviewAdded } = props;
    const { t } = useTranslation(['book-details', 'books-page']);
    const dispatch = useAppDispatch();
    const book = useSelector(getBookDetailsData);
    const isLoading = useSelector(getBookDetailsIsLoading);
    const error = useSelector(getBookDetailsError);
    const user = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const navigate = useNavigate();
    const { data: stats } = useGetBookReviewStats(bookId);
    const [setReadingStatus] = useSetReadingStatus();

    const genreLabels = useMemo(() => {
        if (!book?.genres?.length) {
            return [];
        }

        return book.genres
            .filter((genre) => genre !== BookGenre.ALL)
            .map((genre) => t(genreTranslationKey(genre), { ns: 'books-page' }));
    }, [book?.genres, t]);

    const onRateClick = useCallback(() => {
        document
            .getElementById('book-details-rating')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    const onWantToRead = useCallback(() => {
        if (!user?.id) {
            return;
        }
        setReadingStatus({
            userId: user.id,
            bookId,
            status: ReadingStatus.WANT_TO_READ,
        });
    }, [bookId, setReadingStatus, user?.id]);

    const onEdit = useCallback(() => {
        if (book) {
            navigate(getRouteBookEdit(book.id));
        }
    }, [book, navigate]);

    const onRetry = useCallback(() => {
        dispatch(fetchBookById(bookId));
    }, [bookId, dispatch]);

    if (isLoading) {
        return (
            <div className={classNames(cls.BookDetailsHero, {}, [className])}>
                <BookDetailsSkeleton />
            </div>
        );
    }

    if (error) {
        return (
            <Card
                className={classNames(cls.BookDetailsHero, {}, [className])}
                padding="24"
                border="partial"
                max
            >
                <VStack gap="16" align="center" max>
                    <Text
                        title={t('loading_error', { ns: 'book-details' })}
                        align="center"
                    />
                    <Button variant="outline" color="accent" onClick={onRetry}>
                        {t('retry', { ns: 'book-details' })}
                    </Button>
                </VStack>
            </Card>
        );
    }

    if (!book) {
        return null;
    }

    const settingsItems = [{ content: t('edit'), onClick: onEdit }];

    const averageStars = stats ? Math.round(stats.average) : 0;

    return (
        <HStack
            gap="24"
            max
            className={className}
            data-testid="BookDetailsHero"
        >
            <AppImage
                height={380}
                width={260}
                src={book.img}
                className={cls.cover}
                fallback={
                    <Skeleton
                        width={260}
                        height={380}
                        border="16px"
                    />
                }
            />
            <VStack gap="16" className={cls.meta} max>
                <h1 className={cls.title}>{book.title}</h1>
                {book.author && (
                    <AuthorInline
                        author={book.author}
                        className={cls.author}
                        link
                    />
                )}
                {stats && stats.ratingsCount > 0 && (
                    <VStack gap="4" align="start">
                        <HStack gap="8" align="center">
                            <StarRating
                                size={20}
                                selectedStars={averageStars}
                            />
                            <Text
                                text={stats.average.toFixed(1)}
                                bold
                                className={cls.ratingValue}
                            />
                        </HStack>
                        <Text
                            text={t('ratings_and_reviews', {
                                ratings: stats.ratingsCount,
                                reviews: stats.reviewsCount,
                            })}
                            size="s"
                            className={cls.ratingMeta}
                        />
                    </VStack>
                )}
                <Text text={book.subtitle} className={cls.subtitle} />
                {genreLabels.length > 0 && (
                    <HStack gap="8" wrap="wrap" className={cls.tags}>
                        {genreLabels.map((label) => (
                            <Badge key={label}>{label}</Badge>
                        ))}
                    </HStack>
                )}
                <HStack gap="8" wrap="wrap" className={cls.actions}>
                    <Button
                        variant="primary"
                        color="accent"
                        onClick={onWantToRead}
                        addonLeft={<Icon height={20} width={20} Svg={BookmarkIcon} />}
                    >

                        {t('want_to_read', { ns: 'book-details' })}
                    </Button>
                    <Button
                        variant="secondary"
                        color="accent"
                        onClick={onRateClick}
                        addonLeft={<Icon height={20} width={20} Svg={StarIcon} />}
                    >
                        {t('evaluate_book', { ns: 'book-details' })}
                    </Button>
                    {isAdmin && (
                        <Dropdown
                            items={settingsItems}
                            trigger={
                                <Button
                                    variant="outline"
                                    color="normal"
                                    square
                                >
                                    ...
                                </Button>
                            }
                        />
                    )}
                </HStack>
            </VStack>

            <BookDetailsSidebar
                bookId={bookId}
                className={cls.sidebar}
                onReviewAdded={onReviewAdded}
            />
        </HStack>
    );
});

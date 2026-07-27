import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BookShareButton } from '@/features/bookShare';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { BookDetailsBreadcrumbs } from '@/widgets/BookDetailsBreadcrumbs';
import cls from './BookDetailsToolbar.module.scss';
import { smallerThanLg } from '@/shared/const/mediaQuery';

interface BookDetailsToolbarProps {
    className?: string;
    bookId: string;
}

export const BookDetailsToolbar = memo((props: BookDetailsToolbarProps) => {
    const { className, bookId } = props;
    const isSmallerThanLg = useMediaQuery(smallerThanLg);

    return (
        <HStack
            max
            justify="between"
            align="start"
            gap="16"
            className={classNames(cls.BookDetailsToolbar, {}, [className])}
            data-testid="BookDetailsToolbar"
        >
            <BookDetailsBreadcrumbs />
            <HStack gap="8" className={cls.actions}>
                {!isSmallerThanLg && <BookShareButton />}
                {/* <BookSaveButton bookId={bookId} /> */}
            </HStack>
        </HStack>
    );
});

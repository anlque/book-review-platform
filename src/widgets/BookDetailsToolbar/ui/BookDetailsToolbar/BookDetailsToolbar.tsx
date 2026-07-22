import { memo } from 'react';
import { BookShareButton } from '@/features/bookShare';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { BookDetailsBreadcrumbs } from '@/widgets/BookDetailsBreadcrumbs';
import cls from './BookDetailsToolbar.module.scss';

interface BookDetailsToolbarProps {
    className?: string;
    bookId: string;
}

export const BookDetailsToolbar = memo((props: BookDetailsToolbarProps) => {
    const { className, bookId } = props;

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
                <BookShareButton />
                {/* <BookSaveButton bookId={bookId} /> */}
            </HStack>
        </HStack>
    );
});

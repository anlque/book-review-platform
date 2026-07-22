import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { BookDetailsAbout } from '@/widgets/BookDetailsAbout';
import { BookDetailsRatingDistribution } from '@/widgets/BookDetailsRatingDistribution';
import cls from './BookDetailsContentRow.module.scss';

interface BookDetailsContentRowProps {
    className?: string;
    bookId: string;
}

export const BookDetailsContentRow = memo((props: BookDetailsContentRowProps) => {
    const { className, bookId } = props;

    return (
        <div
            className={classNames(cls.BookDetailsContentRow, {}, [className])}
            data-testid="BookDetailsContentRow"
        >
            <BookDetailsAbout className={cls.about} />
            <BookDetailsRatingDistribution
                bookId={bookId}
                className={cls.distribution}
            />
        </div>
    );
});

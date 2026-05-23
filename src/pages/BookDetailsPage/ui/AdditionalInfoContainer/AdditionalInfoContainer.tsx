import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/redesigned/Card';
import { BookAdditionalInfo } from '@/widgets/BookAdditionalInfo';
import { getBookDetailsData } from '@/entities/Book';
import { getRouteBookEdit } from '@/shared/const/router';

export const AdditionalInfoContainer = memo(() => {
    const book = useSelector(getBookDetailsData);
    const navigate = useNavigate();

    const onEditBook = useCallback(() => {
        if (book) {
            navigate(getRouteBookEdit(book.id));
        }
    }, [book, navigate]);

    if (!book) {
        return null;
    }

    return (
        <Card padding="16" border="partial">
            <BookAdditionalInfo
                onEdit={onEditBook}
                submittedBy={book.user}
                publishedYear={book.publishedYear}
            />
        </Card>
    );
});

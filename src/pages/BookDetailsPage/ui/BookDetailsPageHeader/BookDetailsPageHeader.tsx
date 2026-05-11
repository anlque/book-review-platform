import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getBookDetailsData } from '@/entities/Book';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getRouteBookEdit, getRouteBooks } from '@/shared/const/router';

interface BookDetailsPageHeaderProps {
    className?: string;
}

export const BookDetailsPageHeader = memo((props: BookDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation('book');
    const navigate = useNavigate();
    const book = useSelector(getBookDetailsData);

    const onBackToList = useCallback(() => {
        navigate(getRouteBooks());
    }, [navigate]);

    const onEditBook = useCallback(() => {
        if (book) {
            navigate(getRouteBookEdit(book.id));
        }
    }, [book, navigate]);

    return (
        <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
        >
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                {t('back_to_list')}
            </Button>
            <Button theme={ButtonTheme.OUTLINE} onClick={onEditBook}>
                {t('edit')}
            </Button>
        </HStack>
    );
});


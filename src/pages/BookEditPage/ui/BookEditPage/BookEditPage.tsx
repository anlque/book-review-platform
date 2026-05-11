import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BookEditPage.module.scss';

interface BookEditPageProps {
    className?: string;
}

const BookEditPage = memo((props: BookEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames(cls.BookEditPage, {}, [className])}>
            {isEdit ? `${t('edit_book')}${id}` : t('create_book')}
        </Page>
    );
});

export default BookEditPage;


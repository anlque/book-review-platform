import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '../BookListItem.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { BookTextBlock } from '../../../model/types/book';
import {
    BookView,
    BookBlockType,
} from '../../../model/consts/bookConsts';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { BookTextBlockComponent } from '../../BookTextBlockComponent/BookTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteBookDetails } from '@/shared/const/router';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { BookListItemProps } from '../BookListItem';

export const BookListItemDeprecated = memo((props: BookListItemProps) => {
    const { className, book, view, target } = props;
    const { t } = useTranslation();

    const types = <Text text={book.type.join(', ')} className={cls.types} />;

    if (view === BookView.BIG) {
        const textBlock = book.blocks.find(
            (block) => block.type === BookBlockType.TEXT,
        ) as BookTextBlock;

        return (
            <div
                data-testid="BookListItem"
                className={classNames(cls.BookListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={book.user.avatar} />
                        <Text
                            text={book.user.username}
                            className={cls.username}
                        />
                        <Text text={book.createdAt} className={cls.date} />
                    </div>
                    <Text title={book.title} className={cls.title} />
                    {types}
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={book.img}
                        className={cls.img}
                        alt={book.title}
                    />
                    {textBlock && (
                        <BookTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={getRouteBookDetails(book.id)}
                        >
                            <Button theme={ButtonTheme.OUTLINE}>
                                {t('show_more')}
                            </Button>
                        </AppLink>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="BookListItem"
            target={target}
            to={getRouteBookDetails(book.id)}
            className={classNames(cls.BookListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        fallback={<Skeleton width={200} height={200} />}
                        alt={book.title}
                        src={book.img}
                        className={cls.img}
                    />
                    <Text text={book.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                </div>
                <Text text={book.title} className={cls.title} />
            </Card>
        </AppLink>
    );
});

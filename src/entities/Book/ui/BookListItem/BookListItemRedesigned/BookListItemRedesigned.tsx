import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthorInline } from '@/entities/Author';
import { getRouteBookDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookView } from '../../../model/consts/bookConsts';
import { BookListItemProps } from '../BookListItem';
import cls from './BookListItemRedesigned.module.scss';

export const BookListItemRedesigned = memo((props: BookListItemProps) => {
    const { className, book, view, target } = props;
    const { t } = useTranslation();

    const userInfo = (
        <>
            <Avatar
                size={32}
                src={book.user.avatar}
                className={cls.avatar}
            />
            <Text bold text={book.user.username} />
        </>
    );

    if (view === BookView.BIG) {
        const firstBlock = book.blocks[0];

        return (
            <Card
                padding="24"
                max
                data-testid="BookListItem"
                className={classNames(cls.BookListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack max gap="16">
                    <HStack gap="8" max>
                        <AuthorInline author={book.author} className={cls.writer} />
                        <Text size="s" text={book.publishedYear} />
                    </HStack>
                    <Text title={book.title} bold />
                    <Text title={book.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={book.img}
                        className={cls.img}
                        alt={book.title}
                    />
                    {firstBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={firstBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}
                    <HStack max justify="between">
                        <AppLink
                            target={target}
                            to={getRouteBookDetails(book.id)}
                        >
                            <Button variant="outline">
                                {t('show_more')}
                            </Button>
                        </AppLink>
                    </HStack>
                </VStack>
            </Card>
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
            <Card className={cls.card} border="partial" padding="0">
                <AppImage
                    fallback={<Skeleton width="100%" height={200} />}
                    alt={book.title}
                    src={book.img}
                    className={cls.img}
                />
                <VStack className={cls.info} gap="4">
                    <Text title={book.title} className={cls.title} />
                    <VStack gap="4" className={cls.footer} max>
                        <AuthorInline author={book.author} className={cls.writer} />
                        <Text
                            size="s"
                            text={book.publishedYear}
                            className={cls.date}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});

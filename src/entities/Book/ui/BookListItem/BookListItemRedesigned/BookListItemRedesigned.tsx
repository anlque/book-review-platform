import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BookListItemRedesigned.module.scss';
import { BookListItemProps } from '../BookListItem';
import { Text } from '@/shared/ui/redesigned/Text';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { getRouteBookDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AuthorInline } from '@/entities/Author';
import { BookBlockType, BookView } from '../../../model/consts/bookConsts';
import { BookTextBlock } from '../../../model/types/book';

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
        const textBlock = book.blocks.find(
            (block) => block.type === BookBlockType.TEXT,
        ) as BookTextBlock;

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
                        <Text size="s" text={book.createdAt} />
                    </HStack>
                    <Text title={book.title} bold />
                    <Text title={book.subtitle} size="s" />
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={book.img}
                        className={cls.img}
                        alt={book.title}
                    />
                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
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
                            text={book.createdAt}
                            className={cls.date}
                        />
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});

import { memo } from 'react';
import { getRouteAuthor } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Text } from '@/shared/ui/redesigned/Text';
import { Author } from '../../model/types/author';
import cls from './AuthorInline.module.scss';

interface AuthorInlineProps {
    className?: string;
    author: Author;
    link?: boolean;
}

export const AuthorInline = memo((props: AuthorInlineProps) => {
    const { className, author, link = false } = props;

    const name = (
        <Text
            size="m"
            bold
            text={author.name}
            className={className}
            variant={link ? 'accent' : undefined}
        />
    );

    if (!link) {
        return name;
    }

    return (
        <AppLink to={getRouteAuthor(author.id)} className={cls.link}>
            {name}
        </AppLink>
    );
});

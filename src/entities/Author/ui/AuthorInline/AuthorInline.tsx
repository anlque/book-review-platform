import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { Author } from '../../model/types/author';

interface AuthorInlineProps {
    className?: string;
    author: Author;
}

export const AuthorInline = memo((props: AuthorInlineProps) => {
    const { className, author } = props;

    return (
        <Text size="s" text={author.name} className={className} />
    );
});

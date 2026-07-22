import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/redesigned/Text';
import { BookBlock } from '../../model/types/book';
import cls from './BookTextBlockComponent.module.scss';

interface BookTextBlockComponentProps {
    className?: string;
    block: BookBlock;
}

export const BookTextBlockComponent = memo((props: BookTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.BookTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={cls.title} />
            )}
            {block.paragraphs.map((paragraph) => (
                <Text
                    key={paragraph}
                    text={paragraph}
                    className={cls.paragraph}
                />
            ))}
        </div>
    );
});

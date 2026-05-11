import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookTextBlockComponent.module.scss';
import { BookTextBlock } from '../../model/types/book';
import { ToggleFeatures } from '@/shared/lib/features';

interface BookTextBlockComponentProps {
    className?: string;
    block: BookTextBlock;
}

export const BookTextBlockComponent = memo((props: BookTextBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.BookTextBlockComponent, {}, [className])}>
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text title={block.title} className={cls.title} />}
                    off={
                        <TextDeprecated
                            title={block.title}
                            className={cls.title}
                        />
                    }
                />
            )}
            {block.paragraphs.map((paragraph) => (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    }
                    off={
                        <TextDeprecated
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    }
                />
            ))}
        </div>
    );
});


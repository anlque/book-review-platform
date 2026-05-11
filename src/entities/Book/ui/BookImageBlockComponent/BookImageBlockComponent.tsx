import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from './BookImageBlockComponent.module.scss';
import { BookImageBlock } from '../../model/types/book';
import { ToggleFeatures } from '@/shared/lib/features';

interface BookImageBlockComponentProps {
    className?: string;
    block: BookImageBlock;
}

export const BookImageBlockComponent = memo((props: BookImageBlockComponentProps) => {
    const { className, block } = props;

    return (
        <div className={classNames(cls.BookImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Text text={block.title} align="center" />}
                    off={
                        <TextDeprecated
                            text={block.title}
                            align={TextAlign.CENTER}
                        />
                    }
                />
            )}
        </div>
    );
});


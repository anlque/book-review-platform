import { BookBlock } from '../../model/types/book';
import { BookBlockType } from '../../model/consts/bookConsts';
import cls from './BookDetails.module.scss';
import { BookImageBlockComponent } from '../BookImageBlockComponent/BookImageBlockComponent';
import { BookTextBlockComponent } from '../BookTextBlockComponent/BookTextBlockComponent';

export const renderBookBlock = (block: BookBlock) => {
    switch (block.type) {
    case BookBlockType.IMAGE:
        return (
            <BookImageBlockComponent
                key={block.id}
                block={block}
                className={cls.block}
            />
        );
    case BookBlockType.TEXT:
        return (
            <BookTextBlockComponent
                key={block.id}
                className={cls.block}
                block={block}
            />
        );
    default:
        return null;
    }
};


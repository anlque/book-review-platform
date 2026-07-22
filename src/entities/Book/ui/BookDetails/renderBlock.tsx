import { BookBlock } from '../../model/types/book';
import { BookTextBlockComponent } from '../BookTextBlockComponent/BookTextBlockComponent';
import cls from './BookDetails.module.scss';

export const renderBookBlock = (block: BookBlock) => {
    // TODO: redundant?
    return <BookTextBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
    />;
};

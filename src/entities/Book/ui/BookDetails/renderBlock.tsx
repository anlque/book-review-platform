import { BookBlock } from '../../model/types/book';
import cls from './BookDetails.module.scss';
import { BookTextBlockComponent } from '../BookTextBlockComponent/BookTextBlockComponent';

export const renderBookBlock = (block: BookBlock) => {
    // TODO: redundant?
    return <BookTextBlockComponent
        key={block.id}
        className={cls.block}
        block={block}
    />;
};

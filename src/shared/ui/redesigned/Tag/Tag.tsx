import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tag.module.scss';

interface TagProps {
    className?: string;
    children: ReactNode;
}

export const Tag = memo((props: TagProps) => {
    const { className, children } = props;

    return (
        <span className={classNames(cls.Tag, {}, [className])}>
            {children}
        </span>
    );
});

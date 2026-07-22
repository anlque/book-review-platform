import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Badge.module.scss';

export type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'filled';

// TODO: check if it's needed with Tag comp together

interface BadgeProps {
    variant?: BadgeVariant;
    className?: string;
    children?: ReactNode;
}

export const Badge = (props: BadgeProps) => {
    const { className, children, variant = 'outline' } = props;
    return (
        <div className={classNames(cls.Badge, {}, [cls[variant], className])}>
            {children}
        </div>);
};

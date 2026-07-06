import {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef, memo,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'accent' | 'success' | 'error';

export type ButtonSize = 's' | 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Button theme. For visual management (border, not styled, inverted color, etc.)
     */
    variant?: ButtonVariant;
    /**
     * Whether the button should be square
     */
    square?: boolean;
    /**
     * Button size in according to design system
     */
    size?: ButtonSize;
    /**
     * Whether button is clicked/chosen
     */
    active?: boolean;
    /**
     * Whether button is enabled
     */
    disabled?: boolean;
    /**
     * Button content
     */
    children?: ReactNode;
    /**
     * Makes button take full available width
     */
    fullWidth?: boolean;

    color?: ButtonColor;

    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo(forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square, active,
            disabled,
            fullWidth,
            size = 'm',
            addonLeft,
            addonRight,
            color = 'normal',
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls.square]: square,
            [cls.active]: active,
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
        };

        // TODO: role
        return (
            <button
                type="button"
                className={classNames(cls.Button, mods, [
                    className,
                    cls[variant],
                    cls[size],
                    cls[color],
                ])}
                disabled={disabled}
                {...otherProps}
                ref={ref}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                {children}
                <div className={cls.addonRight}>{addonRight}</div>
            </button>
        );
    },
));

Button.displayName = 'Button';

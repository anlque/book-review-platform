import { memo, type FC, type SVGProps } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

export type IconVariant = 'primary' | 'error' | 'accent' | 'currentColor';

interface IconBaseProps extends SvgProps {
    className?: string;
    btnClassName?: string;
    variant?: IconVariant;
    dataTestId?: string
    Svg: FC<SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className, btnClassName,
        Svg,
        width = 32,
        height = 32,
        variant = 'primary',
        clickable,
        dataTestId,
        ...otherProps
    } = props;

    const icon = (
        <Svg
            className={classNames(cls.Icon, {}, [className, cls[variant]])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(cls.button, {}, [btnClassName, cls[variant]])}
                onClick={props.onClick}
                style={{ height, width }}
                data-testid={dataTestId}
            >
                {icon}
            </button>
        );
    }

    return icon;
});

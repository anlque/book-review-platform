import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <img src="/logo.png" alt="Writing quill" height={size} width={size} />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});

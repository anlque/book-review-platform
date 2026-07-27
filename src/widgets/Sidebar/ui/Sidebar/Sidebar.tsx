import { memo, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import ArrowIcon from '@/shared/assets/icons/chevron-down.svg';
import { smallerThanLg } from '@/shared/const/mediaQuery';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { NavigationContent } from '../NavigationContent/NavigationContent';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const isSmallerThanLg = useMediaQuery(smallerThanLg);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    useEffect(() => {
        if (isSmallerThanLg) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }, [isSmallerThanLg]);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.SidebarRedesigned,
                { [cls.collapsedRedesigned]: collapsed },
                [className],
            )}
        >
            <NavigationContent variant="sidebar" collapsed={collapsed} />
            {!isSmallerThanLg && <Icon
                dataTestId="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtnIcon}
                btnClassName={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />}
        </aside>
    );
});

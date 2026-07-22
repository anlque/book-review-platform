import { memo, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/chevron-down.svg';
import { smallerThanLg } from '@/shared/const/mediaQuery';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSidebarItems();
    const isSmallerThanLg = useMediaQuery(smallerThanLg);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

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
            <AppLogo
                size={collapsed ? 30 : 80}
                className={cls.appLogo}
            />
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            {!isSmallerThanLg && <Icon
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtnIcon}
                btnClassName={cls.collapseBtn}
                Svg={ArrowIcon}
                clickable
            />}

            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </aside>
    );
});

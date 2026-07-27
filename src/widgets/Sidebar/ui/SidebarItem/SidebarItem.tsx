import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
    variant: 'sidebar' | 'drawer';
    onNavigate?: () => void;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        item,
        collapsed,
        variant,
        onNavigate,
    } = props;
    const { t } = useTranslation();
    const isDrawer = variant === 'drawer';

    return (
        <AppLink
            to={item.path}
            className={classNames(cls.item, {
                [cls.sidebarItem]: !isDrawer,
                [cls.sidebarItemCollapsed]: !isDrawer && collapsed,
                [cls.drawerItem]: isDrawer,
            })}
            activeClassName={isDrawer ? cls.drawerItemActive : cls.sidebarItemActive}
            onClick={() => {
                item.handler?.();
                onNavigate?.();
            }}
        >
            <Icon Svg={item.Icon} height={20} width={20} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
});

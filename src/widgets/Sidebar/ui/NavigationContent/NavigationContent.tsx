import { memo } from 'react';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './NavigationContent.module.scss';

type NavigationContentVariant = 'sidebar' | 'drawer';

interface NavigationContentProps {
    collapsed?: boolean;
    onNavigate?: () => void;
    variant: NavigationContentVariant;
}

export const NavigationContent = memo((props: NavigationContentProps) => {
    const {
        collapsed = false,
        onNavigate,
        variant,
    } = props;
    const items = useSidebarItems();
    const isDrawer = variant === 'drawer';
    let logoSize = 70;

    if (isDrawer) {
        logoSize = 64;
    } else if (collapsed) {
        logoSize = 30;
    }

    return (
        <div
            className={classNames(cls.content, {
                [cls.sidebar]: !isDrawer,
                [cls.sidebarCollapsed]: !isDrawer && collapsed,
                [cls.drawer]: isDrawer,
            })}
            data-testid="NavigationContent"
        >
            <AppLogo
                size={logoSize}
                className={cls.logo}
            />
            <VStack
                role="navigation"
                aria-label="Global navigation"
                gap="8"
                max={isDrawer}
                className={cls.items}
            >
                {items.map((item) => (
                    <SidebarItem
                        item={item}
                        collapsed={collapsed}
                        variant={variant}
                        onNavigate={onNavigate}
                        key={item.path}
                    />
                ))}
            </VStack>
            {isDrawer && <hr className="divider" />}
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={!isDrawer && collapsed} />
            </div>
        </div>
    );
});

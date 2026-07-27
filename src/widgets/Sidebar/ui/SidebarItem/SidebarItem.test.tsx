import { fireEvent, screen } from '@testing-library/react';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { SidebarItemType } from '../../model/types/sidebar';
import { SidebarItem } from './SidebarItem';

const TestIcon = () => <svg />;

describe('SidebarItem', () => {
    test('runs the item action and navigation callback', () => {
        const handler = jest.fn();
        const onNavigate = jest.fn();
        const item: SidebarItemType = {
            path: '/about',
            text: 'about_us',
            Icon: TestIcon,
            handler,
        };

        componentRender(
            <SidebarItem
                item={item}
                collapsed={false}
                variant="drawer"
                onNavigate={onNavigate}
            />,
        );

        fireEvent.click(screen.getByRole('link'));

        expect(handler).toHaveBeenCalledTimes(1);
        expect(onNavigate).toHaveBeenCalledTimes(1);
    });
});

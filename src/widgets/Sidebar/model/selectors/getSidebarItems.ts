import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import MainIconDeprecated from '@/shared/assets/icons/main_old.svg';
import AboutIconDeprecated from '@/shared/assets/icons/about_old.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile_old.svg';
import BookIconDeprecated from '@/shared/assets/icons/book_old.svg';

import MainIcon from '@/shared/assets/icons/home.svg';
import BookIcon from '@/shared/assets/icons/book.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteBooks,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';
import { toggleFeatures } from '@/shared/lib/features';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => MainIconDeprecated,
                on: () => MainIcon,
            }),
            text: 'main_page',
        },
        {
            path: getRouteAbout(),
            Icon: toggleFeatures({
                name: 'isAppRedesigned',
                off: () => AboutIconDeprecated,
                on: () => AboutIcon,
            }),
            text: 'about_us',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => ProfileIconDeprecated,
                    on: () => ProfileIcon,
                }),
                text: 'profile_page',
                authOnly: true,
            },
            {
                path: getRouteBooks(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => BookIconDeprecated,
                    on: () => BookIcon,
                }),
                text: 'books_page',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};

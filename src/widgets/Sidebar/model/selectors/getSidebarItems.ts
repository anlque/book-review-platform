import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';

import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import BookIcon from '@/shared/assets/icons/book.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';

import { BookGenre } from '@/entities/Book';
import { useBookFilters } from '@/pages/BooksPage/lib/hooks/useBookFilters';
import { getRouteAbout, getRouteBooks, getRouteMain, getRouteProfile } from '@/shared/const/router';
import { SidebarItemType } from '../types/sidebar';

export const useSidebarItems = () => {
    const userData = useSelector(getUserAuthData);
    const {
        onChangeGenres,

    } = useBookFilters();
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'main_page',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'about_us',
        },
        {
            path: getRouteBooks(),
            Icon: BookIcon,
            text: 'books_page',
            handler: () => { onChangeGenres(BookGenre.ALL); },
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'profile_page',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
};

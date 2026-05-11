import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { BooksPage } from '@/pages/BooksPage';
import { BookDetailsPage } from '@/pages/BookDetailsPage';
import { BookEditPage } from '@/pages/BookEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteBookCreate,
    getRouteBookDetails,
    getRouteBookEdit,
    getRouteForbidden,
    getRouteBooks,
    getRouteMain,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { SettingsPage } from '@/pages/SettingsPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.BOOKS]: {
        path: getRouteBooks(),
        element: <BooksPage />,
        authOnly: true,
    },
    [AppRoutes.BOOK_DETAILS]: {
        path: getRouteBookDetails(':id'),
        element: <BookDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.BOOK_CREATE]: {
        path: getRouteBookCreate(),
        element: <BookEditPage />,
        authOnly: true,
    },
    [AppRoutes.BOOK_EDIT]: {
        path: getRouteBookEdit(':id'),
        element: <BookEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};

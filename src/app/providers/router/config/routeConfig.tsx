import { UserRole } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { AuthorPage } from '@/pages/AuthorPage';
import { BookDetailsPage } from '@/pages/BookDetailsPage';
import { BookEditPage } from '@/pages/BookEditPage';
import { BooksPage } from '@/pages/BooksPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SettingsPage } from '@/pages/SettingsPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdmin,
    getRouteAuthor,
    getRouteBookCreate,
    getRouteBookDetails,
    getRouteBookEdit,
    getRouteBooks,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
    getRouteSettings,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

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
    },
    [AppRoutes.BOOK_DETAILS]: {
        path: getRouteBookDetails(':id'),
        element: <BookDetailsPage />,
    },
    [AppRoutes.AUTHOR]: {
        path: getRouteAuthor(':id'),
        element: <AuthorPage />,
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

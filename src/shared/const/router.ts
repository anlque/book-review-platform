export enum AppRoutes {
    MAIN = 'main',
    SETTINGS = 'settings',
    ABOUT = 'about',
    PROFILE = 'profile',
    BOOKS = 'books',
    BOOK_DETAILS = 'book_details',
    BOOK_CREATE = 'book_create',
    BOOK_EDIT = 'book_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteSettings = () => '/settings';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profiles/${id}`;
export const getRouteBooks = () => '/books';
export const getRouteBookDetails = (id: string) => `/books/${id}`;
export const getRouteBookCreate = () => '/books/new';
export const getRouteBookEdit = (id: string) => `/books/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteBooks()]: AppRoutes.BOOKS,
    [getRouteBookDetails(':id')]: AppRoutes.BOOK_DETAILS,
    [getRouteBookCreate()]: AppRoutes.BOOK_CREATE,
    [getRouteBookEdit(':id')]: AppRoutes.BOOK_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};

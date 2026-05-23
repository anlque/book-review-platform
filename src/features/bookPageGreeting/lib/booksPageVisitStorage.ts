import { BOOKS_PAGE_WAS_OPENED_KEY } from '@/shared/const/localstorage';

const SEEN_VALUE = '1';

export function readBooksPageWasOpenedFromStorage(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }
    try {
        return localStorage.getItem(BOOKS_PAGE_WAS_OPENED_KEY) === SEEN_VALUE;
    } catch {
        return false;
    }
}

export function writeBooksPageWasOpenedToStorage(): void {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.setItem(BOOKS_PAGE_WAS_OPENED_KEY, SEEN_VALUE);
    } catch (e) {
        if (__IS_DEV__) {
            console.warn('Books page greeting: storage unavailable', e);
        }
    }
}

export function clearBooksPageWasOpenedFromStorage(): void {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        localStorage.removeItem(BOOKS_PAGE_WAS_OPENED_KEY);
    } catch (e) {
        if (__IS_DEV__) {
            console.warn('Books page greeting: storage unavailable', e);
        }
    }
}

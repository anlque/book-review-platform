import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserInited } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    readBooksPageWasOpenedFromStorage,
    writeBooksPageWasOpenedToStorage,
} from '../../lib/booksPageVisitStorage';
import { markAuthenticatedBooksPageAsOpened } from
    '../services/markAuthenticatedBooksPageAsOpened/markAuthenticatedBooksPageAsOpened';

export interface UseBooksPageVisitTrackingResult {
    isBooksPageWasOpened: boolean;
    markBooksPageAsOpened: () => void;
}

export function useBooksPageVisitTracking(): UseBooksPageVisitTrackingResult {
    const userInited = useSelector(getUserInited);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const [guestLsSnapshot, setGuestLsSnapshot] = useState(() =>
        readBooksPageWasOpenedFromStorage(),
    );

    useEffect(() => {
        if (userInited && !authData) {
            setGuestLsSnapshot(readBooksPageWasOpenedFromStorage());
        }
    }, [userInited, authData]);

    const isBooksPageWasOpened = useMemo(() => {
        if (!userInited) {
            return true;
        }
        if (authData) {
            return Boolean(authData.jsonSettings?.isBooksPageWasOpened);
        }
        return guestLsSnapshot;
    }, [userInited, authData, guestLsSnapshot]);

    const markBooksPageAsOpened = useCallback(() => {
        if (authData) {
            dispatch(markAuthenticatedBooksPageAsOpened());
            return;
        }
        writeBooksPageWasOpenedToStorage();
        setGuestLsSnapshot(true);
    }, [authData, dispatch]);

    return { isBooksPageWasOpened, markBooksPageAsOpened };
}

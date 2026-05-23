import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData, saveJsonSettings } from '@/entities/User';
import {
    clearBooksPageWasOpenedFromStorage,
    readBooksPageWasOpenedFromStorage,
} from '../../../lib/booksPageVisitStorage';

export const syncBooksPageVisitFromGuestStorage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'bookPageGreeting/syncBooksPageVisitFromGuestStorage',
    async (_, { getState, dispatch }) => {
        const authData = getUserAuthData(getState());
        if (!authData) {
            return;
        }
        if (!readBooksPageWasOpenedFromStorage()) {
            return;
        }
        if (authData.jsonSettings?.isBooksPageWasOpened) {
            clearBooksPageWasOpenedFromStorage();
            return;
        }
        try {
            await dispatch(
                saveJsonSettings({ isBooksPageWasOpened: true }),
            ).unwrap();
            clearBooksPageWasOpenedFromStorage();
        } catch (e) {
            console.warn('Failed to sync books page visit flag', e);
        }
    },
);

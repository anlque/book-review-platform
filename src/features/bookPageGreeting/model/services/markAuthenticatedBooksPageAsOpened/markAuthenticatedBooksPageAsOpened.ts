import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData, saveJsonSettings } from '@/entities/User';

export const markAuthenticatedBooksPageAsOpened = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'bookPageGreeting/markAuthenticatedBooksPageAsOpened',
    async (_, { getState, dispatch }) => {
        const authData = getUserAuthData(getState());
        if (!authData) {
            return;
        }
        await dispatch(
            saveJsonSettings({ isBooksPageWasOpened: true }),
        ).unwrap();
    },
);

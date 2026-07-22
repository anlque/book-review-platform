import { memo, Suspense, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData, getUserInited, initAuthData } from '@/entities/User';
import { syncBooksPageVisitFromGuestStorage } from '@/features/bookPageGreeting';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from './lib/useAppToolbar';
import { AppRouter } from './providers/router';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

// TODO: make books route available for everyone
// TODO: create authors route
// TODO: add books for authors
// TODO: upd bd
// TODO: separate about page to parts

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const authData = useSelector(getUserAuthData);
    const toolbar = useAppToolbar();
    const visitSyncForUserId = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    useEffect(() => {
        if (!inited || !authData) {
            visitSyncForUserId.current = undefined;
            return;
        }
        if (visitSyncForUserId.current === authData.id) {
            return;
        }
        visitSyncForUserId.current = authData.id;
        dispatch(syncBooksPageVisitFromGuestStorage());
    }, [inited, authData, dispatch]);

    if (!inited) {
        return (
            <div
                id="app"
                className={classNames('app_redesigned', {}, [theme])}
            >
                <AppLoaderLayout />
                {' '}
            </div>
        );
    }

    return (
        <div
            id="app"
            className={classNames('app_redesigned', {}, [theme])}
        >
            <Suspense fallback="">
                <MainLayout
                    header={<Navbar />}
                    content={<AppRouter />}
                    sidebar={<Sidebar />}
                    toolbar={toolbar}
                />
            </Suspense>
        </div>
    );
});

export default withTheme(App);

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import App from './app/App';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import './shared/config/i18n/i18n';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Root container not found. React app mount failed',
    );
}

const root = createRoot(container);

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';

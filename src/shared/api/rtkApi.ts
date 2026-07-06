import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

function serializeParams(params: Record<string, unknown>) {
    const usp = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }
        if (Array.isArray(value)) {
            value.forEach((item) => usp.append(key, String(item)));
        } else {
            usp.append(key, String(value));
        }
    });
    return usp.toString();
}

export const rtkApi = createApi({
    reducerPath: 'api',
    tagTypes: ['BookReviewStats', 'BookRating', 'UserBook', 'SavedBook'],
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        paramsSerializer: serializeParams,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({}),
});

import { rtkApi } from '@/shared/api/rtkApi';
import { ReadingStatus, UserBook } from '../model/types/readingStatus';

interface ReadingStatusArg {
    userId: string;
    bookId: string;
}

interface SetReadingStatusArg extends ReadingStatusArg {
    status: ReadingStatus;
}

const bookReadingStatusApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getReadingStatus: build.query<UserBook | null, ReadingStatusArg>({
            query: ({ userId, bookId }) => ({
                url: '/user-books',
                params: { userId, bookId },
            }),
            transformResponse: (response: UserBook[]) => response[0] ?? null,
            providesTags: (_result, _error, arg) => [
                { type: 'UserBook', id: `${arg.userId}-${arg.bookId}` },
            ],
        }),
        setReadingStatus: build.mutation<UserBook, SetReadingStatusArg>({
            async queryFn(arg, _api, _extra, fetchWithBQ) {
                const existing = await fetchWithBQ({
                    url: '/user-books',
                    params: {
                        userId: arg.userId,
                        bookId: arg.bookId,
                    },
                });

                if (existing.error) {
                    return { error: existing.error };
                }

                const rows = existing.data as UserBook[];
                const row = rows[0];

                if (row?.id) {
                    const update = await fetchWithBQ({
                        url: `/user-books/${row.id}`,
                        method: 'PATCH',
                        body: { status: arg.status },
                    });

                    if (update.error) {
                        return { error: update.error };
                    }

                    return { data: { ...row, status: arg.status } };
                }

                const create = await fetchWithBQ({
                    url: '/user-books',
                    method: 'POST',
                    body: {
                        userId: arg.userId,
                        bookId: arg.bookId,
                        status: arg.status,
                    },
                });

                if (create.error) {
                    return { error: create.error };
                }

                return { data: create.data as UserBook };
            },
            invalidatesTags: (_result, _error, arg) => [
                { type: 'UserBook', id: `${arg.userId}-${arg.bookId}` },
            ],
        }),
    }),
});

export const useGetReadingStatus = bookReadingStatusApi.useGetReadingStatusQuery;
export const useSetReadingStatus = bookReadingStatusApi.useSetReadingStatusMutation;

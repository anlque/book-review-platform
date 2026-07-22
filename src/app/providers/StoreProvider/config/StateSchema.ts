import {
    Action,
    EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { BookDetailsSchema } from '@/entities/Book';
import { UserSchema } from '@/entities/User';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/editableProfileCard';
import { UISchema } from '@/features/UI';
import { AuthorDetailsSchema } from '@/pages/AuthorPage/model/types/authorDetailsSchema';
import { BookDetailsPageSchema } from '@/pages/BookDetailsPage';
import { BooksPageSchema } from '@/pages/BooksPage';
import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    user: UserSchema;
    ui: UISchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // Async reducers
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    bookDetails?: BookDetailsSchema;
    booksPage?: BooksPageSchema;
    bookDetailsPage?: BookDetailsPageSchema;
    authorDetails?: AuthorDetailsSchema;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema | undefined, action: Action) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
    // true - mounted, false - unmounted
    getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}

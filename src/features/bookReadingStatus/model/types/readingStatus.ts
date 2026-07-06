export enum ReadingStatus {
    WANT_TO_READ = 'WANT_TO_READ',
    CURRENTLY_READING = 'CURRENTLY_READING',
    READ = 'READ',
}

export interface UserBook {
    id: string;
    userId: string;
    bookId: string;
    status: ReadingStatus;
}

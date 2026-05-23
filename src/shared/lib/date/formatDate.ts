export function formatDate(date: string, locale: string) {
    return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));
}

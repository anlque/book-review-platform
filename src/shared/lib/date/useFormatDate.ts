import { useTranslation } from 'react-i18next';

import { formatDate } from './formatDate';

export function useFormatDate() {
    const { i18n } = useTranslation();

    return (date: string) => formatDate(date, i18n.language);
}

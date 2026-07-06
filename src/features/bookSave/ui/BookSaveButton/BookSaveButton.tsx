import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import StarIcon from '@/shared/assets/icons/star.svg';
import {
    useGetSavedBook,
    useSaveBook,
    useUnsaveBook,
} from '../../api/bookSaveApi';

interface BookSaveButtonProps {
    className?: string;
    bookId: string;
}

export const BookSaveButton = memo((props: BookSaveButtonProps) => {
    const { className, bookId } = props;
    const { t } = useTranslation('book-details');
    const user = useSelector(getUserAuthData);
    const userId = user?.id;

    const { data: saved } = useGetSavedBook(
        { userId: userId ?? '', bookId },
        { skip: !userId },
    );
    const [saveBook] = useSaveBook();
    const [unsaveBook] = useUnsaveBook();

    const onToggle = useCallback(async () => {
        if (!userId) {
            return;
        }
        if (saved?.id) {
            await unsaveBook(saved.id).unwrap();
            return;
        }
        await saveBook({ userId, bookId }).unwrap();
    }, [bookId, saveBook, saved?.id, unsaveBook, userId]);

    if (!userId) {
        return null;
    }

    return (
        <Button
            className={className}
            variant="outline"
            color="accent"
            onClick={onToggle}
        >
            <Icon Svg={StarIcon} width={18} height={18} variant="accent" />
            {saved ? t('saved') : t('save')}
        </Button>
    );
});

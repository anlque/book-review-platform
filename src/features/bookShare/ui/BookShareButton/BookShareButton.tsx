import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getBookDetailsData } from '@/entities/Book';
import ShareIcon from '@/shared/assets/icons/share.svg';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface BookShareButtonProps {
    className?: string;
}

export const BookShareButton = memo((props: BookShareButtonProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');
    const book = useSelector(getBookDetailsData);

    const onShare = useCallback(async () => {
        const url = window.location.href;
        const title = book?.title ?? document.title;

        if (navigator.share) {
            try {
                await navigator.share({ title, url });
                return;
            } catch {
                // TODO: should we implement what's defined in the comment below?
                // fall through to clipboard
            }
        }

        await navigator.clipboard.writeText(url);
    }, [book?.title]);

    return (
        <Button
            className={className}
            variant="outline"
            color="accent"
            onClick={onShare}
            addonLeft={<Icon Svg={ShareIcon} width={18} height={18} />}
        >

            {t('share')}
        </Button>
    );
});

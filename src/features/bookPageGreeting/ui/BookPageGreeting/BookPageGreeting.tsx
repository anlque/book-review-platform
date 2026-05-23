import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { useBooksPageVisitTracking } from '../../model/hooks/useBooksPageVisitTracking';

export const BookPageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isBooksPageWasOpened, markBooksPageAsOpened } =
        useBooksPageVisitTracking();

    useEffect(() => {
        if (isBooksPageWasOpened) {
            return;
        }
        setIsOpen(true);
        markBooksPageAsOpened();
    }, [isBooksPageWasOpened, markBooksPageAsOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('Welcome to books page')}
            text={t('You can browse and rate different books here')}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});

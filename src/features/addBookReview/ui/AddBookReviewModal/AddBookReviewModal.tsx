import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { useAddBookReview } from '../../api/addBookReviewApi';

interface AddBookReviewModalProps {
    bookId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const AddBookReviewModal = memo((props: AddBookReviewModalProps) => {
    const { bookId, isOpen, onClose, onSuccess } = props;
    const { t } = useTranslation('book-details');
    const user = useSelector(getUserAuthData);
    const [rate, setRate] = useState(5);
    const [text, setText] = useState('');
    const [addReview, { isLoading }] = useAddBookReview();

    const onSubmit = useCallback(async () => {
        if (!user?.id || !text.trim()) {
            return;
        }

        await addReview({
            userId: user.id,
            bookId,
            rate,
            text: text.trim(),
        }).unwrap();

        setText('');
        setRate(5);
        onClose();
        onSuccess?.();
    }, [addReview, bookId, onClose, onSuccess, rate, text, user?.id]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} lazy>
            <VStack gap="16" max>
                <Text title={t('write_review')} size="l" bold />
                <StarRating selectedStars={rate} onSelect={setRate} size={28} />
                <Input
                    value={text}
                    onChange={setText}
                    placeholder={t('your_feedback')}
                />
                <Button
                    fullWidth
                    variant="filled"
                    color="accent"
                    disabled={isLoading || !text.trim()}
                    onClick={onSubmit}
                >
                    {t('send')}
                </Button>
            </VStack>
        </Modal>
    );
});

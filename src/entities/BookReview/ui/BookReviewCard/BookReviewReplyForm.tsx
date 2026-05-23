import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import SendIcon from '@/shared/assets/icons/send.svg';
import CrossIcon from '@/shared/assets/icons/cross.svg';

interface BookReviewReplyFormProps {
    text: string;
    onReply: () => void;
    onCancel: () => void;
    onSetComment: (text: string) => void;
    avatar?: string;
}

const BookReviewReplyForm = memo((props: BookReviewReplyFormProps) => {
    const { text, avatar, onReply, onSetComment, onCancel } = props;
    const { t } = useTranslation('book-details');
    const sendBtn =
        <Button
            square
            size="l"
            variant="clear"
            color="normal"
            onClick={onReply}
        >
            <Icon Svg={SendIcon} height={20} width={20} />
        </Button>;

    return (
        <HStack max gap="8" justify="between">
            {avatar ? (
                <Avatar
                    size={35}
                    src={avatar}
                />
            ) : null}
            <Input value={text} placeholder={t('your_reply')} onChange={onSetComment} addonRight={sendBtn} />
            <Button
                square
                size="l"
                variant="outline"
                color="accent"
                onClick={onCancel}
            >
                <Icon Svg={CrossIcon} variant="accent" />
            </Button>

        </HStack>
    );
});

export default BookReviewReplyForm;

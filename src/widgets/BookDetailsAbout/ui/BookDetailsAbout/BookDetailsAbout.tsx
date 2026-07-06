import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getBookDetailsData,
    getBookDetailsIsLoading,
} from '@/entities/Book';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BookDetailsAbout.module.scss';

interface BookDetailsAboutProps {
    className?: string;
}

export const BookDetailsAbout = memo((props: BookDetailsAboutProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');
    const book = useSelector(getBookDetailsData);
    const isLoading = useSelector(getBookDetailsIsLoading);
    const [isExpanded, setIsExpanded] = useState(false);

    const aboutText = useMemo(() => {
        if (!book) {
            return '';
        }

        const paragraphs = book.blocks
            .flatMap((block) => block.paragraphs);

        if (paragraphs.length > 0) {
            return paragraphs.join('\n\n');
        }

        return book.subtitle;
    }, [book]);

    if (isLoading || !book || !aboutText.trim()) {
        return null;
    }

    const shouldCollapse = aboutText.length > 320;

    return (
        <Card
            className={classNames(cls.BookDetailsAbout, {}, [className])}
            padding="16"
            border="partial"
            max
            data-testid="BookDetailsAbout"
        >
            <VStack gap="16" max>
                <Text title={t('about_book')} size="m" bold />
                <div
                    className={classNames(cls.text, {
                        [cls.collapsed]: shouldCollapse && !isExpanded,
                    })}
                >
                    {aboutText.split('\n\n').map((paragraph) => (
                        <Text
                            key={paragraph.slice(0, 32)}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    ))}
                </div>
                {shouldCollapse ? (
                    <Button
                        variant="clear"
                        color="accent"
                        onClick={() => setIsExpanded((prev) => !prev)}
                    >
                        {isExpanded ? t('show_less') : t('show_more')}
                    </Button>
                ) : null}
            </VStack>
        </Card>
    );
});

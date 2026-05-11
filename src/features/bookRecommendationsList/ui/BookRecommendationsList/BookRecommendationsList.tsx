import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { BookList } from '@/entities/Book';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { useBookRecommendationsList } from '../../api/bookRecommendationsApi';

interface BookRecommendationsListProps {
    className?: string;
}

export const BookRecommendationsList = memo((props: BookRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { isLoading, data: books, error } = useBookRecommendationsList(3);

    if (isLoading || error || !books) {
        return null;
    }

    return (
        <VStack
            data-testid="BookRecommendationsList"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Text size="l" title={t('recommend')} />}
                off={
                    <TextDeprecated size={TextSize.L} title={t('recommend')} />
                }
            />
            <BookList books={books} target="_blank" />
        </VStack>
    );
});

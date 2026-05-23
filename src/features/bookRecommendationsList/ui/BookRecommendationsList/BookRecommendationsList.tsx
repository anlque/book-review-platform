import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { BookList } from '@/entities/Book';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { useBookRecommendationsList } from '../../api/bookRecommendationsApi';
import RecommendationsIcon from '@/shared/assets/icons/recommendations.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface BookRecommendationsListProps {
    className?: string;
}

export const BookRecommendationsList = memo((props: BookRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('book-details');

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
                on={
                    <HStack gap="4">
                        <Icon height={30} width={30} Svg={RecommendationsIcon} variant="currentColor" />
                        <Text size="l" title={t('recommend')} />
                    </HStack>
                }
                off={
                    <TextDeprecated size={TextSize.L} title={t('recommend')} />
                }
            />
            <BookList books={books} target="_blank" />
        </VStack>
    );
});

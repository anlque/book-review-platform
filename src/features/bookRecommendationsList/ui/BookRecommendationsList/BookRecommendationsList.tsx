import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookList } from '@/entities/Book';
import RecommendationsIcon from '@/shared/assets/icons/recommendations.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useBookRecommendationsList } from '../../api/bookRecommendationsApi';

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
            gap="16"
            className={classNames('', {}, [className])}
        >
            <HStack gap="4">
                <Icon height={30} width={30} Svg={RecommendationsIcon} variant="currentColor" />
                <Text size="l" title={t('recommend')} />
            </HStack>
            <BookList books={books} target="_blank" />
        </VStack>
    );
});

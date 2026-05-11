import { memo } from 'react';
import { BookViewSelector } from '@/features/BookViewSelector';
import { useBookFilters } from '../../lib/hooks/useBookFilters';

interface ViewSelectorContainerProps {
    className?: string;
}

export const ViewSelectorContainer = memo(
    (props: ViewSelectorContainerProps) => {
        const { className } = props;
        const { view, onChangeView } = useBookFilters();

        return (
            <BookViewSelector
                className={className}
                view={view}
                onViewClick={onChangeView}
            />
        );
    },
);

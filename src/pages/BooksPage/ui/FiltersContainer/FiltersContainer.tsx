import { memo } from 'react';
import { BooksFilters } from '@/widgets/BooksFilters';
import { useBookFilters } from '../../lib/hooks/useBookFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        onChangeSort,
        onChangeGenres,
        sort,
        genres,
        onChangeSearch,
        search,
        onChangeOrder,
        order,
    } = useBookFilters();

    return (
        <BooksFilters
            genres={genres}
            onChangeSearch={onChangeSearch}
            order={order}
            onChangeOrder={onChangeOrder}
            search={search}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeGenres={onChangeGenres}
            className={className}
        />
    );
});

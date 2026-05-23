import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { BookDetails } from '@/entities/Book';

export const DetailsContainer = memo(() => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return <BookDetails id={id} />;
});

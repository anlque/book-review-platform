import { memo } from 'react';
import { BookDetails } from '@/entities/Book';
import { useParams } from 'react-router-dom';

export const DetailsContainer = memo(() => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return <BookDetails id={id} />;
});


import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';

import { BookView } from '@/entities/Book';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack } from '@/shared/ui/redesigned/Stack';
import cls from './BookViewSelector.module.scss';

interface BookViewSelectorProps {
    className?: string;
    view: BookView;
    onViewClick?: (view: BookView) => void;
}

const viewTypes = [
    {
        view: BookView.SMALL,
        icon: TiledIcon,
    },
    {
        view: BookView.BIG,
        icon: ListIcon,
    },
];

export const BookViewSelector = memo((props: BookViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: BookView) => () => {
        onViewClick?.(newView);
    };

    return (
        <Card
            className={classNames(
                cls.BookViewSelectorRedesigned,
                {},
                [className],
            )}
            border="round"
        >
            <HStack gap="8">
                {viewTypes.map((viewType) => (
                    <Icon
                        clickable
                        key={viewType.view}
                        onClick={onClick(viewType.view)}
                        Svg={viewType.icon}
                        className={classNames('', {
                            [cls.notSelected]: viewType.view !== view,
                        })}
                    />
                ))}
            </HStack>
        </Card>
    );
});

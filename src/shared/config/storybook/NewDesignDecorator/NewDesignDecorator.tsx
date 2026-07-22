import type { Decorator } from '@storybook/react';

export const NewDesignDecorator: Decorator = (StoryComponent) => {
    return (
        <div className="app_redesigned">
            <StoryComponent />
        </div>
    );
};

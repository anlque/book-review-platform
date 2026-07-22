import type { Decorator } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const FeaturesFlagsDecorator =
    (features: FeatureFlags): Decorator => (StoryComponent) => {
        setFeatureFlags(features);
        return <StoryComponent />;
    };

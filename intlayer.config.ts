import { Locales, type IntlayerConfig } from 'intlayer';
import { syncJSON } from '@intlayer/sync-json-plugin';

const config: IntlayerConfig = {
    internationalization: {
        locales: [Locales.ENGLISH, Locales.RUSSIAN],
        defaultLocale: Locales.ENGLISH,
    },
    ai: {
        provider: 'openai',
        model: process.env.INTLAYER_AI_MODEL ?? 'gpt-4o-mini',
        apiKey:
            process.env.OPENAI_API_KEY
            ?? process.env.ANTHROPIC_API_KEY
            ?? process.env.INTLAYER_API_KEY,
        applicationContext: [
            'Book review platform: book catalog, ratings, text reviews, profile pages.',
            'Keep i18next interpolation placeholders (e.g. {{name}}) unchanged.',
            'Match the tone of existing UI strings: short, clear, neutral.',
        ].join('\n'),
    },
    compiler: {
        enabled: false,
    },
    plugins: [
        syncJSON({
            format: 'i18next',
            source: ({ key, locale }) => `./public/locales/${locale}/${key}.json`,
        }),
    ],
};

export default config;

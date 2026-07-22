import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LoupeIcon from '@/shared/assets/icons/loupe.svg';
import RocketIcon from '@/shared/assets/icons/rocket.svg';
import TickIcon from '@/shared/assets/icons/tick.svg';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Page } from '@/widgets/Page';
import cls from './AboutPage.module.scss';

const AboutPage = memo(() => {
    const { t } = useTranslation('about');

    const offerItems = [
        t('offer_catalog'),
        t('offer_reviews'),
        t('offer_recommendations'),
    ];

    return (
        <Page data-testid="AboutPage">
            <VStack gap="24" max className={cls.AboutPage}>
                <header className={cls.hero}>
                    <Text title={t('page_title')} size="l" bold />
                    <p className={cls.tagline}>{t('tagline')}</p>
                </header>

                <Card variant="light" border="partial" padding="24" max>
                    <Text
                        text={t('intro')}
                        className={cls.introLead}
                        size="m"
                    />
                </Card>

                <Card variant="outlined" border="partial" padding="24" max>
                    <VStack gap="16" max className={cls.sectionBody}>
                        <HStack gap="16" max align="center">
                            <div className={cls.sectionIcon}>
                                <Icon Svg={RocketIcon} width={20} height={20} />
                            </div>
                            <Text title={t('why_title')} size="m" bold />
                        </HStack>
                        <Text text={t('why_body')} />
                    </VStack>
                </Card>

                <Card variant="outlined" border="partial" padding="24" max>
                    <VStack gap="24" max>
                        <HStack gap="16" max align="center">
                            <div className={cls.sectionIcon}>
                                <Icon
                                    Svg={LoupeIcon}
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <Text title={t('offer_title')} size="m" bold />
                        </HStack>
                        <hr className="divider" />
                        <VStack gap="16" max>
                            {offerItems.map((line, index) => (
                                <HStack
                                    key={`offer-${index}`}
                                    gap="16"
                                    max
                                    align="start"
                                    className={cls.item}
                                >
                                    <div className={cls.itemIcon}>
                                        <Icon
                                            Svg={TickIcon}
                                            width={20}
                                            height={20}
                                        />
                                    </div>
                                    <Text
                                        text={line}
                                        size="m"
                                        className={cls.itemText}
                                    />
                                </HStack>
                            ))}
                        </VStack>
                    </VStack>
                </Card>

                <div className={cls.closing}>
                    <Text text={t('closing')} />
                </div>
            </VStack>
        </Page>
    );
});

export default AboutPage;

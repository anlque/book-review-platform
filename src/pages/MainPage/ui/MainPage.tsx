import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-named-default
// import { default as Carousel } from 'carousel-ui';
import { Page } from '@/widgets/Page';

const MainPage = () => {
    const { t } = useTranslation('main');

    // console.log('Carousel', Carousel);
    return (
        <Page data-testid="MainPage">
            {/* <Carousel waitingNewValues={false} /> */}
            {t('main_page')}
        </Page>
    );
};

export default MainPage;

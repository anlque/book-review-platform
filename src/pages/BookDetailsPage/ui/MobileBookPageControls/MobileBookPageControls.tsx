import {
    ReactNode,
    RefObject,
    useRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getBookDetailsData } from '@/entities/Book';
import { getUserAuthData } from '@/entities/User';
import { BookActions } from '@/features/bookActions';
import { ReadingStatus } from '@/features/bookReadingStatus';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import BookIcon from '@/shared/assets/icons/book.svg';
import BookmarkIcon from '@/shared/assets/icons/bookmark.svg';
import BurgerIcon from '@/shared/assets/icons/burger.svg';
import CloseIcon from '@/shared/assets/icons/cross.svg';
import MoreIcon from '@/shared/assets/icons/kebab.svg';
import ListIcon from '@/shared/assets/icons/list.svg';
import PencilIcon from '@/shared/assets/icons/pencil.svg';
import SendIcon from '@/shared/assets/icons/send.svg';
import ShareIcon from '@/shared/assets/icons/share.svg';
import StarIcon from '@/shared/assets/icons/star.svg';
import ReadIcon from '@/shared/assets/icons/tick-circle.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Portal } from '@/shared/ui/redesigned/Portal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useSidebarItems } from '@/widgets/Sidebar/model/selectors/getSidebarItems';
import { useMobileOverlayBehavior } from './lib/useMobileOverlayBehavior';
import cls from './MobileBookPageControls.module.scss';

type ActiveMobileOverlay = 'navigation' | 'status' | 'rating' | 'more' | null;

interface MobileBookControlsProps {
    activeOverlay: ActiveMobileOverlay;
    setActiveOverlay: (overlay: ActiveMobileOverlay) => void;
    actions: BookActions;
}

interface MobileBookHeaderProps {
    title?: string;
    isOpen: boolean;
    onMenuOpen: () => void;
    onShare: () => void;
    menuButtonRef: RefObject<HTMLButtonElement | null>;
}

interface MobileNavigationDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    menuButtonRef: RefObject<HTMLButtonElement | null>;
}

interface MobileBookActionBarProps {
    activeOverlay: ActiveMobileOverlay;
    actions: BookActions;
    onOpen: (overlay: ActiveMobileOverlay) => void;
}

interface MobileOverlayProps {
    id: string;
    title: string;
    isOpen: boolean;
    position: 'left' | 'bottom';
    onClose: () => void;
    triggerRef?: RefObject<HTMLElement | null>;
    children: ReactNode;
}

const statuses = [
    ReadingStatus.WANT_TO_READ,
    ReadingStatus.CURRENTLY_READING,
    ReadingStatus.READ,
] as const;

const statusIcons = {
    [ReadingStatus.WANT_TO_READ]: BookmarkIcon,
    [ReadingStatus.CURRENTLY_READING]: BookIcon,
    [ReadingStatus.READ]: ReadIcon,
};

const MobileOverlay = (props: MobileOverlayProps) => {
    const {
        id,
        title,
        isOpen,
        position,
        onClose,
        triggerRef,
        children,
    } = props;
    const panelRef = useRef<HTMLDialogElement>(null);

    useMobileOverlayBehavior({
        isOpen,
        panelRef,
        triggerRef,
        onClose,
    });

    if (!isOpen) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={cls.overlayRoot}
                role="presentation"
            >
                <button
                    type="button"
                    className={cls.overlay}
                    aria-label="Close"
                    onClick={onClose}
                />
                <dialog
                    open
                    id={id}
                    ref={panelRef}
                    className={classNames(cls.panel, {
                        [cls.panelLeft]: position === 'left',
                        [cls.panelBottom]: position === 'bottom',
                    })}
                    aria-modal="true"
                    aria-labelledby={`${id}-title`}
                    tabIndex={-1}
                >
                    <HStack justify="between" align="center" max className={cls.panelHeader}>
                        <Text title={title} size="m" bold />
                        <Button
                            square
                            variant="clear"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <Icon Svg={CloseIcon} width={20} height={20} />
                        </Button>
                    </HStack>
                    {children}
                </dialog>
            </div>
        </Portal>
    );
};

const MobileBookHeader = (props: MobileBookHeaderProps) => {
    const { title, isOpen, onMenuOpen, onShare, menuButtonRef } = props;
    const { t } = useTranslation('book-details');

    return (
        <header className={cls.mobileHeader}>
            <Button
                ref={menuButtonRef}
                square
                variant="clear"
                className={cls.iconButton}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-book-navigation"
                data-testid="MobileBookHeader.Menu"
                onClick={onMenuOpen}
            >
                <Icon Svg={BurgerIcon} width={22} height={22} />
            </Button>
            <h1 className={cls.headerTitle}>{title ?? t('details.title')}</h1>
            <Button
                square
                variant="clear"
                className={cls.iconButton}
                aria-label={t('share')}
                data-testid="MobileBookHeader.Share"
                onClick={onShare}
            >
                <Icon Svg={ShareIcon} width={22} height={22} />
            </Button>
        </header>
    );
};

const MobileNavigationDrawer = (props: MobileNavigationDrawerProps) => {
    const { isOpen, onClose, menuButtonRef } = props;
    const { t } = useTranslation();
    const items = useSidebarItems();
    const user = useSelector(getUserAuthData);

    return (
        <MobileOverlay
            id="mobile-book-navigation"
            title={t('navigation')}
            isOpen={isOpen}
            position="left"
            onClose={onClose}
            triggerRef={menuButtonRef}
        >
            <VStack gap="24" max data-testid="MobileNavigationDrawer">
                <AppLogo size={64} className={cls.drawerLogo} />
                <VStack role="navigation" aria-label="Global navigation" gap="8" max>
                    {items.map((item) => {
                        if (item.authOnly && !user) {
                            return null;
                        }

                        return (
                            <AppLink
                                key={item.path}
                                to={item.path}
                                className={cls.navItem}
                                activeClassName={cls.activeNavItem}
                                onClick={() => {
                                    item.handler?.();
                                    onClose();
                                }}
                            >
                                <Icon Svg={item.Icon} width={20} height={20} />
                                <span>{t(item.text)}</span>
                            </AppLink>
                        );
                    })}
                </VStack>
                <hr className="divider" />
                <VStack gap="16" max>
                    <ThemeSwitcher />
                    <LangSwitcher />
                </VStack>
            </VStack>
        </MobileOverlay>
    );
};

const MobileBookActionBar = (props: MobileBookActionBarProps) => {
    const { activeOverlay, actions, onOpen } = props;
    const { t } = useTranslation('book-details');
    const statusLabel = actions.readingStatus
        ? t(`reading_status.${actions.readingStatus}`)
        : t('status');
    const ratingLabel = actions.userRating
        ? `${actions.userRating}/5`
        : t('rate');

    return (
        <nav
            className={cls.actionBar}
            aria-label="Book actions"
            data-testid="MobileBookActionBar"
        >
            <Button
                variant="clear"
                className={cls.actionBarButton}
                aria-expanded={activeOverlay === 'status'}
                aria-controls="mobile-book-status-sheet"
                data-testid="MobileBookActionBar.Status"
                onClick={() => onOpen('status')}
            >
                <Icon Svg={BookmarkIcon} width={20} height={20} />
                <span>{statusLabel}</span>
            </Button>
            <Button
                variant="clear"
                className={cls.actionBarButton}
                aria-expanded={activeOverlay === 'rating'}
                aria-controls="mobile-book-rating-sheet"
                data-testid="MobileBookActionBar.Rating"
                onClick={() => onOpen('rating')}
            >
                <Icon Svg={StarIcon} width={20} height={20} />
                <span>{ratingLabel}</span>
            </Button>
            <Button
                variant="clear"
                className={cls.actionBarButton}
                aria-expanded={activeOverlay === 'more'}
                aria-controls="mobile-book-more-sheet"
                data-testid="MobileBookActionBar.More"
                onClick={() => onOpen('more')}
            >
                <Icon Svg={MoreIcon} width={20} height={20} />
                <span>{t('more')}</span>
            </Button>
        </nav>
    );
};

const ReadingStatusSheet = (props: {
    isOpen: boolean;
    actions: BookActions;
    onClose: () => void;
}) => {
    const { isOpen, actions, onClose } = props;
    const { t } = useTranslation('book-details');

    return (
        <MobileOverlay
            id="mobile-book-status-sheet"
            title={t('reading_status')}
            isOpen={isOpen}
            position="bottom"
            onClose={onClose}
        >
            <VStack gap="8" max data-testid="ReadingStatusSheet">
                {statuses.map((status) => (
                    <Button
                        key={status}
                        fullWidth
                        variant={actions.readingStatus === status ? 'secondary' : 'outline'}
                        active={actions.readingStatus === status}
                        disabled={actions.isReadingStatusLoading}
                        aria-pressed={actions.readingStatus === status}
                        addonLeft={<Icon Svg={statusIcons[status]} width={20} height={20} />}
                        onClick={() => {
                            actions.onReadingStatusChange(status).then(onClose).catch(() => {});
                        }}
                    >
                        {t(`reading_status.${status}`)}
                    </Button>
                ))}
                {actions.readingStatusError && (
                    <Text text={actions.readingStatusError} variant="error" />
                )}
            </VStack>
        </MobileOverlay>
    );
};

const BookRatingSheet = (props: {
    isOpen: boolean;
    actions: BookActions;
    onClose: () => void;
}) => {
    const { isOpen, actions, onClose } = props;
    const { t } = useTranslation('book-details');

    return (
        <MobileOverlay
            id="mobile-book-rating-sheet"
            title={t('your_rating')}
            isOpen={isOpen}
            position="bottom"
            onClose={onClose}
        >
            <div
                className={cls.ratingGroup}
                role="radiogroup"
                aria-label={t('your_rating')}
                data-testid="BookRatingSheet"
            >
                {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                        key={rating}
                        square
                        variant="clear"
                        className={cls.starButton}
                        role="radio"
                        aria-checked={actions.userRating === rating}
                        aria-label={`Rate ${rating} out of 5`}
                        disabled={actions.isRatingLoading}
                        onClick={() => {
                            actions.onRatingChange(rating).then(onClose).catch(() => {});
                        }}
                    >
                        <Icon
                            Svg={StarIcon}
                            width={32}
                            height={32}
                            className={classNames('', {
                                [cls.starSelected]: rating <= (actions.userRating ?? 0),
                            })}
                        />
                    </Button>
                ))}
            </div>
            {actions.ratingError && (
                <Text text={actions.ratingError} variant="error" />
            )}
        </MobileOverlay>
    );
};

const BookMoreActionsSheet = (props: {
    isOpen: boolean;
    actions: BookActions;
    onClose: () => void;
}) => {
    const { isOpen, actions, onClose } = props;
    const { t } = useTranslation('book-details');

    const runAction = (action: () => Promise<void> | void) => {
        Promise.resolve(action()).finally(onClose);
    };

    return (
        <MobileOverlay
            id="mobile-book-more-sheet"
            title={t('more')}
            isOpen={isOpen}
            position="bottom"
            onClose={onClose}
        >
            <VStack gap="8" max data-testid="BookMoreActionsSheet">
                <Button
                    fullWidth
                    variant="clear"
                    className={cls.moreButton}
                    addonLeft={<Icon Svg={ListIcon} width={20} height={20} />}
                    onClick={() => runAction(actions.onAddToList)}
                >
                    {t('add_to_list')}
                </Button>
                <Button
                    fullWidth
                    variant="clear"
                    className={cls.moreButton}
                    addonLeft={<Icon Svg={PencilIcon} width={20} height={20} />}
                    onClick={() => runAction(actions.onWriteReview)}
                >
                    {t('write_review')}
                </Button>
                <Button
                    fullWidth
                    variant="clear"
                    className={cls.moreButton}
                    addonLeft={<Icon Svg={SendIcon} width={20} height={20} />}
                    onClick={() => runAction(actions.onRecommend)}
                >
                    {t('recommend_book')}
                </Button>
                <Button
                    fullWidth
                    variant="clear"
                    className={cls.moreButton}
                    addonLeft={<Icon Svg={ShareIcon} width={20} height={20} />}
                    onClick={() => runAction(actions.onShare)}
                >
                    {t('share')}
                </Button>
            </VStack>
        </MobileOverlay>
    );
};

export const MobileBookPageControls = (props: MobileBookControlsProps) => {
    const { activeOverlay, setActiveOverlay, actions } = props;
    const book = useSelector(getBookDetailsData);
    const menuButtonRef = useRef<HTMLButtonElement>(null);
    const close = () => setActiveOverlay(null);

    return (
        <>
            <MobileBookHeader
                title={book?.title}
                isOpen={activeOverlay === 'navigation'}
                onMenuOpen={() => setActiveOverlay('navigation')}
                onShare={actions.onShare}
                menuButtonRef={menuButtonRef}
            />
            <MobileNavigationDrawer
                isOpen={activeOverlay === 'navigation'}
                onClose={close}
                menuButtonRef={menuButtonRef}
            />
            <MobileBookActionBar
                activeOverlay={activeOverlay}
                actions={actions}
                onOpen={setActiveOverlay}
            />
            <ReadingStatusSheet
                isOpen={activeOverlay === 'status'}
                actions={actions}
                onClose={close}
            />
            <BookRatingSheet
                isOpen={activeOverlay === 'rating'}
                actions={actions}
                onClose={close}
            />
            <BookMoreActionsSheet
                isOpen={activeOverlay === 'more'}
                actions={actions}
                onClose={close}
            />
        </>
    );
};

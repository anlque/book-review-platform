import { RefObject, useEffect, useRef } from 'react';

interface UseMobileOverlayBehaviorOptions {
    isOpen: boolean;
    panelRef: RefObject<HTMLElement | null>;
    triggerRef?: RefObject<HTMLElement | null>;
    onClose: () => void;
}

const focusableSelector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const getFocusableElements = (element: HTMLElement) => {
    return Array.from(
        element.querySelectorAll<HTMLElement>(focusableSelector),
    );
};

const keepFocusInside = (
    event: globalThis.KeyboardEvent,
    panelElement: HTMLElement,
) => {
    const focusable = getFocusableElements(panelElement);

    if (!focusable.length) {
        event.preventDefault();
        return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
};

export const useMobileOverlayBehavior = (
    options: UseMobileOverlayBehaviorOptions,
) => {
    const {
        isOpen,
        panelRef,
        triggerRef,
        onClose,
    } = options;
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;
        const triggerElement = triggerRef?.current;

        document.body.style.overflow = 'hidden';
        panelRef.current?.focus();

        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            const panelElement = panelRef.current;

            if (event.key === 'Escape') {
                onCloseRef.current();
                return;
            }

            if (event.key !== 'Tab' || !panelElement) {
                return;
            }

            keepFocusInside(event, panelElement);
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', onKeyDown);
            triggerElement?.focus();
        };
    }, [isOpen, panelRef, triggerRef]);
};

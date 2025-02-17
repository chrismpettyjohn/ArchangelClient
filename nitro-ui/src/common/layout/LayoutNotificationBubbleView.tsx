import { FC, useEffect, useMemo, useState } from 'react';
import { Flex, FlexProps } from '..';
import { TransitionAnimation, TransitionAnimationTypes } from '../transitions';

export interface LayoutNotificationBubbleViewProps extends FlexProps {
    fadesOut?: boolean;
    timeoutMs?: number;
    onClose: () => void;
}

export const LayoutNotificationBubbleView: FC<LayoutNotificationBubbleViewProps> = props => {
    const { fadesOut = true, timeoutMs = 8000, onClose = null, overflow = 'hidden', classNames = [], ...rest } = props;
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        setIsVisible(true);

        return () => setIsVisible(false);
    }, []);

    useEffect(() => {
        if (!fadesOut) return;

        const timeout = setTimeout(() => {
            setIsVisible(false);

            setTimeout(() => onClose(), 300);
        }, timeoutMs);

        return () => clearTimeout(timeout);
    }, [fadesOut, timeoutMs, onClose]);

    return (
        <TransitionAnimation type={TransitionAnimationTypes.FADE_IN} inProp={isVisible} timeout={300}>
            <Flex overflow={overflow} classNames={["nitro-notification-bubble", "rounded",]} onClick={onClose} {...rest} />
        </TransitionAnimation>
    );
}

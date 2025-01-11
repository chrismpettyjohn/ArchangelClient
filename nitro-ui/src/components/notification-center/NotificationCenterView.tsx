import { FC, ReactNode, useMemo } from 'react';
import { NotificationBubbleType } from '../../api';
import { Column } from '../../common';
import { useMessageEvent, useNotification } from '../../hooks';
import { GetAlertLayout } from './views/alert-layouts/GetAlertLayout';
import { GetConfirmLayout } from './views/confirm-layouts/GetConfirmLayout';
import { NotificationEvent } from '@nitro-rp/renderer';
import { NotificationDefaultBubbleView } from './views/bubble-layouts/NotificationDefaultBubbleView';

export const NotificationCenterView: FC<{}> = props => {
    const { alerts = [], bubbleAlerts = [], confirms = [], closeAlert = null, closeBubbleAlert = null, closeConfirm = null, showSingleBubble } = useNotification();

    useMessageEvent(NotificationEvent, (event: NotificationEvent) => {
        showSingleBubble(event.getParser().message, NotificationBubbleType.INFO);
    })

    const displayedAlerts = useMemo(() => {
        if (!alerts || !alerts.length) return null;

        const elements: ReactNode[] = [];

        for (const alert of alerts) {
            const element = GetAlertLayout(alert, () => console.log('fuck off'));

            elements.push(element);
        }

        return elements;
    }, [alerts, closeAlert]);

    const displayedBubbleAlerts = useMemo(() => {
        if (!bubbleAlerts || !bubbleAlerts.length) return null;

        return bubbleAlerts.map(alert => <NotificationDefaultBubbleView key={`notification_${alert.id}`} item={alert} onClose={() => closeBubbleAlert(alert)} />)
    }, [bubbleAlerts, closeBubbleAlert]);

    const getConfirms = useMemo(() => {
        if (!confirms || !confirms.length) return null;

        const elements: ReactNode[] = [];

        for (const confirm of confirms) {
            const element = GetConfirmLayout(confirm, () => closeConfirm(confirm));

            elements.push(element);
        }

        return elements;
    }, [confirms, closeConfirm]);

    return (
        <div className="nitro-notification-center-container">
            {displayedBubbleAlerts}
            {getConfirms}
            {displayedAlerts}
        </div>
    );
}

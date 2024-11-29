import { DeviceOpenEvent, InteractionType, RoomSessionEvent } from '@nitro-rp/renderer';
import { FC, useState } from 'react';
import { useCamera, useMessageEvent, useRoomSessionManagerEvent } from '../../hooks';
import { CameraWidgetCaptureView } from './views/CameraWidgetCaptureView';
import { CameraWidgetCheckoutView } from './views/CameraWidgetCheckoutView';
import { CameraWidgetEditorView } from './views/editor/CameraWidgetEditorView';

const MODE_NONE: number = 0;
const MODE_CAPTURE: number = 1;
const MODE_EDITOR: number = 2;
const MODE_CHECKOUT: number = 3;

export const CameraWidgetView: FC<{}> = props => {
    const [mode, setMode] = useState<number>(MODE_NONE);
    const [base64Url, setSavedPictureUrl] = useState<string>(null);
    const { availableEffects = [], selectedPictureIndex = -1, cameraRoll = [], setCameraRoll = null, myLevel = 0, price = { credits: 0, duckets: 0, publishDucketPrice: 0 } } = useCamera();

    const processAction = (type: string) => {
        switch (type) {
            case 'close':
                setMode(MODE_NONE);
                return;
            case 'edit':
                setMode(MODE_EDITOR);
                return;
            case 'delete':
                setCameraRoll(prevValue => {
                    const clone = [...prevValue];

                    clone.splice(selectedPictureIndex, 1);

                    return clone;
                });
                return;
            case 'editor_cancel':
                setMode(MODE_CAPTURE);
                return;
        }
    }

    const checkoutPictureUrl = (pictureUrl: string) => {
        setSavedPictureUrl(pictureUrl);
        setMode(MODE_CHECKOUT);
    }

    useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.ENDED, event => setMode(MODE_NONE));


    useMessageEvent<DeviceOpenEvent>(DeviceOpenEvent, event => {
        if (event.getParser().interactionType !== InteractionType.CAMERA) {
            return;
        }

        setMode(MODE_CAPTURE);
    });

    if (mode === MODE_NONE) return null;

    return (
        <>
            {(mode === MODE_CAPTURE) && <CameraWidgetCaptureView onClose={() => processAction('close')} onEdit={() => processAction('edit')} onDelete={() => processAction('delete')} />}
            {(mode === MODE_EDITOR) && <CameraWidgetEditorView picture={cameraRoll[selectedPictureIndex]} myLevel={myLevel} onClose={() => processAction('close')} onCancel={() => processAction('editor_cancel')} onCheckout={checkoutPictureUrl} availableEffects={availableEffects} />}
            {(mode === MODE_CHECKOUT) && <CameraWidgetCheckoutView base64Url={base64Url} onCloseClick={() => processAction('close')} onCancelClick={() => processAction('editor_cancel')} price={price}></CameraWidgetCheckoutView>}
        </>
    );
}

import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Text } from '../../../../../common';
import { Button } from 'react-bootstrap';
import { SendMessageComposer } from '../../../../../api';
import { ChangePasswordComposer } from '@nitro-rp/renderer';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useMessageEvent } from '../../../../../hooks';
import { ChangePasswordSuccessEvent } from '@nitro-rp/renderer/src/nitro/communication/messages/incoming/nova';

enum PasswordState {
    None = 0,
    Pending = 1,
    Success = 2,
    Failed = 3
}

export function ChangePassword() {
    const [passwordNow, setPasswordNow] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordNewRepeat, setPasswordNewRepeat] = useState('');
    const [state, setState] = useState(PasswordState.None);

    const canChangePassword = useMemo(() => !!passwordNow && !!passwordNew && (passwordNew === passwordNewRepeat) && state === PasswordState.None, [passwordNow, passwordNew, passwordNewRepeat, state]);

    const onChangePassword = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!canChangePassword) return;
        setState(PasswordState.Pending);
        SendMessageComposer(new ChangePasswordComposer(passwordNow, passwordNew, passwordNewRepeat))

    }, [canChangePassword, passwordNow, passwordNew, passwordNewRepeat, state]);

    useMessageEvent(ChangePasswordSuccessEvent, (event: ChangePasswordSuccessEvent) => {
        setState(event.getParser().success ? PasswordState.Success : PasswordState.Failed);
    })

    if (state === PasswordState.Success) {
        return (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FaThumbsUp style={{ fontSize: 24 }} />
                <Text bold fontSize={4}>Password Changed</Text>
                <Text fontSize={6}>Your password has been changed successfully.</Text>
            </div>
        )
    }

    if (state === PasswordState.Failed) {
        return (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FaThumbsDown style={{ fontSize: 24 }} />
                <Text bold fontSize={4} style={{ color: 'red' }}>Something went wrong</Text>
                <Text fontSize={6}>Your password couldn't be changed at this time</Text>
            </div>
        )
    }

    return (
        <form onSubmit={onChangePassword}>
            <Text bold fontSize={4} variant="white">Current Password</Text>
            <input
                className="form-control form-control-sm"
                type="password"
                name="password-now"
                autoFocus
                value={passwordNow}
                onChange={e => setPasswordNow(e.target.value)}
            />
            <br />
            <Text bold fontSize={4} variant="white">New Password</Text>
            <input
                className="form-control form-control-sm"
                type="password"
                name="password-new"
                value={passwordNew}
                onChange={e => setPasswordNew(e.target.value)}
            />
            <Text bold fontSize={4} variant="white">Confirm Password</Text>
            <input
                className="form-control form-control-sm"
                type="password"
                name="password-new-repeat"
                value={passwordNewRepeat}
                onChange={e => setPasswordNewRepeat(e.target.value)}
            />
            <br />
            <Button disabled={!canChangePassword} variant="success" onClick={onChangePassword} type="submit">
                {state === PasswordState.None ? 'Change Password' : 'Loading...'}
            </Button>
        </form>
    )
}
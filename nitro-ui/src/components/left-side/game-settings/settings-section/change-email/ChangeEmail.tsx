import { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from '../../../../../common';
import { Button } from 'react-bootstrap';
import { SendMessageComposer } from '../../../../../api';
import { ChangeEmailComposer, QueryEmailComposer } from '@nitro-rp/renderer';
import { useMessageEvent } from '../../../../../hooks';
import { CurrentEmailEvent } from '@nitro-rp/renderer/src/nitro/communication/messages/incoming/nova';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

enum EmailState {
    None = 0,
    Pending = 1,
    Success = 2,
    Failed = 3
}

export function ChangeEmail() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [state, setState] = useState(EmailState.None);

    const canChangeEmail = useMemo(() => !!password && !!email && state !== EmailState.Pending, [password, email, state]);

    const onChangeEmail = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!canChangeEmail) return;
        SendMessageComposer(new ChangeEmailComposer(email, password));
        setState(EmailState.Pending)
    }, [canChangeEmail, email, state]);

    useMessageEvent(CurrentEmailEvent, (event: CurrentEmailEvent) => {
        setEmail(event.getParser().email);
        if (state === EmailState.Pending) {
            setState(event.getParser().success ? EmailState.Success : EmailState.Failed);
        }
    })

    useEffect(() => {
        SendMessageComposer(new QueryEmailComposer())
    }, []);

    if (state === EmailState.Success) {

        return (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FaThumbsUp style={{ fontSize: 24 }} />
                <Text bold fontSize={4}>Email Changed</Text>
                <Text fontSize={6}>Your email has been changed successfully.</Text>
            </div>
        )
    }

    if (state === EmailState.Failed) {
        return (
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FaThumbsDown style={{ fontSize: 24 }} />
                <Text bold fontSize={4} style={{ color: 'red' }}>Something went wrong</Text>
                <Text fontSize={6}>Your email couldn't be changed at this time</Text>
            </div>
        )
    }

    return (
        <form onSubmit={onChangeEmail}>
            <Text bold fontSize={4} variant="white">Email</Text>
            <input
                className="form-control form-control-sm"
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br />
            <Text bold fontSize={4} variant="white">Password</Text>
            <input
                className="form-control form-control-sm"
                type="password"
                name="password-now"
                autoFocus
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <br />
            <Button disabled={!canChangeEmail} variant="success" onClick={onChangeEmail} type="submit">
                Change Email
            </Button>
        </form>
    )
}
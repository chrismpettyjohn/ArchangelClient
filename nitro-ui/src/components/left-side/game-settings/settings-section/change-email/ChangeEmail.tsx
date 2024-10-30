import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Text } from '../../../../../common';
import { Button } from 'react-bootstrap';

export function ChangeEmail() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const initialEmail = useMemo(() => email, []);

    const canChangeEmail = useMemo(() => !!password && !!email && (email !== initialEmail), []);

    const onChangePassword = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!canChangeEmail) return;
        console.log('will change');
    }, [canChangeEmail]);
    return (
        <form onSubmit={onChangePassword}>
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
            <Button disabled={!canChangeEmail} variant="success">
                Change Email
            </Button>
        </form>
    )
}
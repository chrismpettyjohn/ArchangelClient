import { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { Text } from '../../../../../common';
import { Button } from 'react-bootstrap';

export function ChangePassword() {
    const [passwordNow, setPasswordNow] = useState('');
    const [passwordNew, setPasswordNew] = useState('');
    const [passwordNewRepeat, setPasswordNewRepeat] = useState('');

    const canChangePassword = useMemo(() => !!passwordNow && !!passwordNew && (passwordNew === passwordNewRepeat), [passwordNow, passwordNew, passwordNewRepeat]);

    const onChangePassword = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!canChangePassword) return;
    }, [canChangePassword]);
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
            <Button disabled={!canChangePassword} variant="success">
                Change Password
            </Button>
        </form>
    )
}
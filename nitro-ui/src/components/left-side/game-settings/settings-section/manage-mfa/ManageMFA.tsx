import { useState, useCallback, useEffect } from "react";
import { Button, Text } from "../../../../../common";
import QRCode from "react-qr-code";
import * as OTPAuth from "otpauth";
import { HOTEL_NAME } from "../../../../../constant";

export function ManageMFA() {
    const [secret, setSecret] = useState(null);
    const [userCode, setUserCode] = useState("");
    const [isVerified, setIsVerified] = useState(false);

    const generateSecret = useCallback(() => {
        const newSecret = new OTPAuth.Secret();
        const otpAuthURL = new OTPAuth.TOTP({
            label: HOTEL_NAME,
            issuer: HOTEL_NAME,
            secret: newSecret,
            algorithm: "SHA1",
            digits: 6,
            period: 30,
        });
        setSecret({ uri: otpAuthURL.toString(), secret: newSecret.base32 });
    }, []);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const totp = new OTPAuth.TOTP({ secret: secret.secret, algorithm: "SHA1", digits: 6, period: 30 });
        const isVerified = totp.validate({ token: userCode, window: 1 }) !== null;
        setIsVerified(isVerified);
    }, [secret, userCode]);

    const handleCodeChange = useCallback((event) => setUserCode(event.target.value), []);

    useEffect(() => {
        generateSecret();
    }, []);

    if (!secret) {
        return null;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, flex: 1 }}>
            <QRCode value={secret.uri} size={200} className="mfa-qr-code" />
            <form onSubmit={handleSubmit} className="mfa-form">
                <Text bold fontSize={4} variant="white">Enter code from app</Text>
                <input
                    type="text"
                    value={userCode}
                    onChange={handleCodeChange}
                    className="form-control form-control-sm"
                    style={{ width: 200 }}
                />
                <br />
                <Button variant="success">Verify</Button>
            </form>
            {isVerified && <p className="mfa-success">Verification successful!</p>}
            {!isVerified && userCode && <p className="mfa-error">Verification failed. Try again.</p>}
        </div>
    );
}

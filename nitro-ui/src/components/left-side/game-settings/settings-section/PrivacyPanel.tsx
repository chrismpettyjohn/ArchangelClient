import { useState } from "react"
import { Text } from "../../../../common";

export function PrivacyPanel() {
    const [blockFriendRequests, setBlockFriendRequests] = useState(false);
    return (
        <>
            <Text bold fontSize={4} variant="white">Friend Requests</Text>
            <select className="form-control">
                <option>Allowed</option>
                <option>Blocked</option>
            </select>
        </>
    )
}
import { QueryUserProfileBannerComposer } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { SendMessageComposer } from "../../api";
import { useMessageEvent } from "../events";
import { UserProfileBannerEvent } from "@nitro-rp/renderer/src/nitro/communication/messages/incoming/nova";

export function useProfileBanner(userID: number): string {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (!userID) return;
        SendMessageComposer(new QueryUserProfileBannerComposer(userID));
    }, [userID]);

    useMessageEvent(UserProfileBannerEvent, (event: UserProfileBannerEvent) => {
        if (event.getParser().userId !== userID) {
            return;
        }
        setUrl(event.getParser().url)
    })

    return url;
}
import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { OfferStoreProductEvent, StoreProductOffer } from "@nitro-rp/renderer";

export function ProductOffer() {
    const [isVisible, setIsVisible] = useState(false)
    const [offerData, setOfferData] = useState<StoreProductOffer>();

    useMessageEvent<OfferStoreProductEvent>(OfferStoreProductEvent, event => {
        setIsVisible(true);
        setOfferData(event.getParser().offer);
    });

    function onClose() {
        setIsVisible(false);
    }
    if (!isVisible || !offerData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="productOffer" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Product Offer" onCloseClick={onClose} />
            <NitroCardContentView>
                <Text variant="white">Hello world</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}
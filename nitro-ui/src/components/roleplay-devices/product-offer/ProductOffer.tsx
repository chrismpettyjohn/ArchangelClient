import './ProductOffer.scss';
import { useCallback, useMemo, useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { AcceptStoreProductOfferComposer, NitroConfiguration, OfferStoreProductEvent, RejectStoreProductOfferComposer, StoreProductOffer, StoreProductType } from "@nitro-rp/renderer";
import { SendMessageComposer } from '../../../api';

export function ProductOffer() {
    const [isVisible, setIsVisible] = useState(false)
    const [offerData, setOfferData] = useState<StoreProductOffer>();
    const productImage: string = useMemo(() => {
        if (!offerData) return '';

        if (offerData.productType === StoreProductType.WEAPON) {
            return `${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${offerData.productKey}.png`
        }

        if (offerData.productType === StoreProductType.AMMO) {
            return `${NitroConfiguration.getValue('image.library.url')}/weapon_icons/${offerData.productKey}.png`
        }

    }, [offerData]);

    useMessageEvent<OfferStoreProductEvent>(OfferStoreProductEvent, event => {
        setIsVisible(true);
        setOfferData(event.getParser().offer);
    });

    const onClose = useCallback(() => {
        setIsVisible(false);
    }, [setIsVisible]);

    const onBuyNow = useCallback(() => {
        if (!offerData) return;
        SendMessageComposer(new AcceptStoreProductOfferComposer(offerData.id));
        setIsVisible(false);
        setOfferData(undefined);
    }, [offerData]);

    const onCancel = useCallback(() => {
        if (!offerData) return;
        SendMessageComposer(new RejectStoreProductOfferComposer(offerData.id));
        setIsVisible(false);
        setOfferData(undefined);
    }, [offerData]);

    if (!isVisible || !offerData) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="productOffer" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Product Offer" onCloseClick={onClose} />
            <NitroCardContentView>
                <div className="product-offer">
                    <img src={productImage} alt="Product Image" className="product-image" style={{ objectFit: 'scale-down' }} />
                    <h2 className="product-title">{offerData.productName}</h2>
                    <h3 className="product-cost">${offerData.productCost}</h3>
                    <div className="product-actions">
                        <button className="buy-button" onClick={onBuyNow}>Buy Now</button>
                        <button className="cancel-button" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    )
}
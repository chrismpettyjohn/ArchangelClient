import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { AmmoCrateData, AmmoCrateDataEvent } from "@nitro-rp/renderer";

export function AmmoCrate() {
    const [isVisible, setIsVisible] = useState(false)
    const [ammo, setAmmo] = useState<AmmoCrateData[]>([]);

    useMessageEvent<AmmoCrateDataEvent>(AmmoCrateDataEvent, event => {
        setIsVisible(true);
        setAmmo(event.getParser().items);
    });

    function onClose() {
        setIsVisible(false);
    }
    if (!isVisible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="ammoCrate" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Ammo Crate" onCloseClick={onClose} />
            <NitroCardContentView>
                <Text variant="white">Hello world</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}
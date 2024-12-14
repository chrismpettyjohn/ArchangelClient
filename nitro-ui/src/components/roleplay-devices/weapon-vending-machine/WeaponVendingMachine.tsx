import { useState } from "react";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { WeaponVendingMachineData, WeaponVendingMachineDataEvent } from "@nitro-rp/renderer";

export function WeaponVendingMachine() {
    const [isVisible, setIsVisible] = useState(false)
    const [editing, setEditing] = useState(false);
    const [weapons, setWeapons] = useState<WeaponVendingMachineData[]>([]);

    useMessageEvent<WeaponVendingMachineDataEvent>(WeaponVendingMachineDataEvent, event => {
        setIsVisible(true);
        setWeapons(event.getParser().items);
    });

    function onClose() {
        setIsVisible(false);
    }
    if (!isVisible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="weaponVendingMachine" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Weapon Vending Machine" onCloseClick={onClose} />
            <NitroCardContentView>
                <Text variant="white">Hello world</Text>
            </NitroCardContentView>
        </NitroCardView >
    )
}
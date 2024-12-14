import { useCallback, useMemo, useState } from "react";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { WeaponType, WeaponVendingMachineData, WeaponVendingMachineDataEvent, WeaponVendingMachineTakeOneComposer } from "@nitro-rp/renderer";
import { Button } from "react-bootstrap";
import { SendMessageComposer } from "../../../api";
import { WeaponTypeSelect } from "../../roleplay/WeaponTypeSelect";

export function WeaponVendingMachine() {
    const [isVisible, setIsVisible] = useState(false)
    const [weapons, setWeapons] = useState<WeaponVendingMachineData[]>([]);
    const [weaponType, setWeaponType] = useState<WeaponType>();

    const filteredWeapons = useMemo(() => {
        if (!weaponType) {
            return weapons;
        }

        return weapons.filter(_ => _.weaponType === weaponType);
    }, [weapons, weaponType]);

    useMessageEvent<WeaponVendingMachineDataEvent>(WeaponVendingMachineDataEvent, event => {
        setIsVisible(true);
        setWeapons(event.getParser().items);
    });

    function onClose() {
        setIsVisible(false);
    }

    const takeWeapon = useCallback((weaponId: number) => {
        SendMessageComposer(new WeaponVendingMachineTakeOneComposer(weaponId));
        setIsVisible(false);
    }, []);

    if (!isVisible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="weaponVendingMachine" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Weapon Vending Machine" onCloseClick={onClose} />
            <NitroCardContentView>
                <Column gap={2}>
                    <Text bold fontSize={5} variant="white">Weapon Type</Text>
                    <WeaponTypeSelect type={weaponType} onChange={setWeaponType} />
                    <Grid gap={2} overflow="auto" className="ammo-list" style={{ maxHeight: '300px', gridTemplateColumns: '2fr 2fr' }}>
                        {filteredWeapons.map(item => (
                            <Column key={item.id} className="ammo-item" gap={1}>
                                <Text fontSize={5} bold variant="white">
                                    <strong>{item.displayName}</strong>
                                </Text>
                                <Text fontSize={5}>
                                    Type: <strong>{item.weaponType}</strong>
                                </Text>
                                <Button onClick={() => takeWeapon(item.id)}>Take</Button>
                            </Column>
                        ))}
                        {
                            !filteredWeapons.length ? <p>No  weapons found</p> : ''
                        }
                    </Grid>
                </Column>
            </NitroCardContentView>
        </NitroCardView >
    )
}
import { useState, useMemo } from "react";
import {
    NitroCardContentView,
    NitroCardHeaderView,
    NitroCardView,
    Text,
    Column,
    Button,
    Grid,
} from "../../../common";
import { useMessageEvent } from "../../../hooks";
import { AmmoCrateData, AmmoCrateDataEvent, AmmoSize } from "@nitro-rp/renderer";
import { AmmoSizeSelect } from "../../roleplay/AmmoSizeOption";

export function AmmoCrate() {
    const [isVisible, setIsVisible] = useState(false);
    const [ammo, setAmmo] = useState<AmmoCrateData[]>([]);
    const [ammoSize, setAmmoSize] = useState<AmmoSize>();

    useMessageEvent<AmmoCrateDataEvent>(AmmoCrateDataEvent, event => {
        setIsVisible(true);
        setAmmo(event.getParser().items);
    });

    function onClose() {
        setIsVisible(false);
    }

    function grabAmmo(id: number) {
        console.log(`Ammo with ID ${id} grabbed.`);
        // Implement grab logic here
    }

    const filteredAmmo = useMemo(() => {
        if (!ammoSize) {
            return ammo;
        }

        return ammo.filter(_ => _.ammoSize === ammoSize);
    }, [ammo, ammoSize]);

    const sizeOptions = useMemo(
        () => [
            { value: "all", text: "All Sizes" },
            ...Array.from(new Set(ammo.map(item => item.ammoSize))).map(size => ({
                value: size,
                text: size
            }))
        ],
        [ammo]
    );

    if (!isVisible) return null;

    return (
        <NitroCardView uniqueKey="ammoCrate" className="nitro-inventory glass-panel">
            <NitroCardHeaderView headerText="Ammo Crate" onCloseClick={onClose} />
            <NitroCardContentView>
                <Column gap={2}>
                    <Text bold fontSize={5} variant="white">Ammo Type</Text>
                    <AmmoSizeSelect ammoSize={ammoSize} onChange={setAmmoSize} />
                    <Grid gap={2} overflow="auto" className="ammo-list" style={{ maxHeight: '300px', gridTemplateColumns: '2fr 2fr' }}>
                        {filteredAmmo.map(item => (
                            <Column key={item.id} className="ammo-item" gap={1}>
                                <Text fontSize={5} bold variant="white">
                                    <strong>{item.displayName}</strong> ({item.ammoSize})
                                </Text>
                                <Text variant="white">Type: {item.ammoType}</Text>
                                <Button onClick={() => grabAmmo(item.id)}>Take</Button>
                            </Column>
                        ))}
                        {
                            !filteredAmmo.length ? <p>No  ammo found</p> : ''
                        }
                    </Grid>
                </Column>
            </NitroCardContentView>
        </NitroCardView>
    );
}

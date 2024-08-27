import { SyntheticEvent, useEffect, useState } from "react";
import { Base, Flex } from "../../../common";
import { HotBarItem, HotBarListItemsEvent } from "@nitro-rp/renderer";
import { useMessageEvent } from "../../../hooks";
import { HotBarListItems } from "../../../api/roleplay/items/HotBarListItems";
import { FaTimes } from "react-icons/fa";
import { DeviceOpen } from "../../../api/roleplay/device/DeviceOpen";
import { HotBarPickupItem } from "../../../api/roleplay/items/HotBarPickupItem";
import { GetRoomEngine } from "../../../api";

export function HotBarView() {
    const [items, setItems] = useState<HotBarItem[]>([]);

    useMessageEvent<HotBarListItemsEvent>(HotBarListItemsEvent, event => {
        const parser = event.getParser();
        setItems(parser.items);
    });

    useEffect(() => {
        HotBarListItems();
    }, []);

    function onPickup(event: SyntheticEvent, itemID: number) {
        event.stopPropagation();
        HotBarPickupItem(itemID)
    }

    return (
        <Flex alignItems="center" justifyContent="between" gap={2} className="nitro-hotbar">
            <Flex center fullWidth>
                <div className="hotbar glass-panel neon-border">
                    {
                        Array.from(new Array(12)).map((_, i) => {
                            const item = items[i]
                            const iconURL = item?.spriteId && GetRoomEngine().getFurnitureFloorIconUrl(item.spriteId);
                            return (
                                <div className="hotbar-slot" key={`hotbar-item_${i}`} onClick={() => item ? DeviceOpen(item.id) : null}>
                                    {
                                        item && (
                                            <>
                                                <div className="hotbar-remove" onClick={e => onPickup(e, item.id)}>
                                                    <FaTimes />
                                                </div>
                                                <Base fit className="unique-bg-override" style={{ backgroundImage: `url(${iconURL})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} />
                                            </>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </Flex>
        </Flex>
    )
}
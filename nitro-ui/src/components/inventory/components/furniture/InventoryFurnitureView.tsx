import { IRoomSession, RoomObjectVariable, RoomPreviewer, Vector3d } from '@nitro-rp/renderer';
import { useEffect, useState } from 'react';
import { attemptItemPlacement, DispatchUiEvent, FurniCategory, GetRoomEngine, GetSessionDataManager, GroupItem, LocalizeText, UnseenItemCategory } from '../../../../api';
import { AutoGrid, Button, Column, Grid, LayoutLimitedEditionCompactPlateView, LayoutRarityLevelView, LayoutRoomPreviewerView, Text } from '../../../../common';
import { CatalogPostMarketplaceOfferEvent } from '../../../../events';
import { useInventoryFurni } from '../../../../hooks';
import { InventoryCategoryEmptyView } from '../InventoryCategoryEmptyView';
import { InventoryFurnitureItemView } from './InventoryFurnitureItemView';
import { InventoryFurnitureSearchView } from './InventoryFurnitureSearchView';
import { DeviceOpen } from '../../../../api/roleplay/device/DeviceOpen';
import { HotBarAddItem } from '../../../../api/roleplay/items/HotBarAddItem';

interface InventoryFurnitureViewProps {
    roomSession: IRoomSession;
    roomPreviewer: RoomPreviewer;
}

const attemptPlaceMarketplaceOffer = (groupItem: GroupItem) => {
    const item = groupItem.getLastItem();

    if (!item) return false;

    if (!item.sellable) return false;

    DispatchUiEvent(new CatalogPostMarketplaceOfferEvent(item));
}

export function InventoryFurnitureView({ roomSession = null, roomPreviewer = null }: InventoryFurnitureViewProps) {
    const [filteredGroupItems, setFilteredGroupItems] = useState<GroupItem[]>([]);
    const { groupItems = [], selectedItem = null, activate = null, deactivate = null } = useInventoryFurni();

    useEffect(() => {
        if (!selectedItem || !roomPreviewer) return;

        const furnitureItem = selectedItem.getLastItem();

        if (!furnitureItem) return;

        const roomEngine = GetRoomEngine();

        let wallType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_WALL_TYPE);
        let floorType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_FLOOR_TYPE);
        let landscapeType = roomEngine.getRoomInstanceVariable<string>(roomEngine.activeRoomId, RoomObjectVariable.ROOM_LANDSCAPE_TYPE);

        wallType = (wallType && wallType.length) ? wallType : '101';
        floorType = (floorType && floorType.length) ? floorType : '101';
        landscapeType = (landscapeType && landscapeType.length) ? landscapeType : '1.1';

        roomPreviewer.reset(false);
        roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);
        roomPreviewer.updateRoomWallsAndFloorVisibility(true, true);

        if ((furnitureItem.category === FurniCategory.WALL_PAPER) || (furnitureItem.category === FurniCategory.FLOOR) || (furnitureItem.category === FurniCategory.LANDSCAPE)) {
            floorType = ((furnitureItem.category === FurniCategory.FLOOR) ? selectedItem.stuffData.getLegacyString() : floorType);
            wallType = ((furnitureItem.category === FurniCategory.WALL_PAPER) ? selectedItem.stuffData.getLegacyString() : wallType);
            landscapeType = ((furnitureItem.category === FurniCategory.LANDSCAPE) ? selectedItem.stuffData.getLegacyString() : landscapeType);

            roomPreviewer.updateObjectRoom(floorType, wallType, landscapeType);

            if (furnitureItem.category === FurniCategory.LANDSCAPE) {
                const data = GetSessionDataManager().getWallItemDataByName('window_double_default');

                if (data) roomPreviewer.addWallItemIntoRoom(data.id, new Vector3d(90, 0, 0), data.customParams);
            }
        }
        else {
            if (selectedItem.isWallItem) {
                roomPreviewer.addWallItemIntoRoom(selectedItem.type, new Vector3d(90), furnitureItem.stuffData.getLegacyString());
            }
            else {
                roomPreviewer.addFurnitureIntoRoom(selectedItem.type, new Vector3d(90), selectedItem.stuffData, (furnitureItem.extra.toString()));
            }
        }
    }, [roomPreviewer, roomSession, selectedItem]);


    useEffect(() => {
        const id = activate();

        return () => deactivate(id);
    }, [activate, deactivate]);

    if (!groupItems || !groupItems.length) return <InventoryCategoryEmptyView title={LocalizeText('inventory.empty.title')} desc={LocalizeText('inventory.empty.desc')} />;

    return (
        <Grid>
            <Column size={7} overflow="hidden">
                <InventoryFurnitureSearchView groupItems={groupItems} setGroupItems={setFilteredGroupItems} />
                <AutoGrid columnCount={5}>
                    {filteredGroupItems && (filteredGroupItems.length > 0) && filteredGroupItems.map((item, index) => <InventoryFurnitureItemView key={index} groupItem={item} />)}
                </AutoGrid>
            </Column>
            <Column size={5} overflow="auto">
                {
                    selectedItem && (
                        <>
                            <Column overflow="hidden" position="relative">
                                <LayoutRoomPreviewerView roomPreviewer={roomPreviewer} height={140} />
                                {selectedItem.stuffData.isUnique &&
                                    <LayoutLimitedEditionCompactPlateView className="top-2 end-2" position="absolute" uniqueNumber={selectedItem.stuffData.uniqueNumber} uniqueSeries={selectedItem.stuffData.uniqueSeries} />
                                }
                                {selectedItem.stuffData.rarityLevel > -1 &&
                                    <LayoutRarityLevelView className="top-2 end-2" position="absolute" level={selectedItem.stuffData.rarityLevel} />
                                }
                            </Column>
                            <Column grow justifyContent="between" gap={2}>
                                <Text grow truncate variant="white">{selectedItem.name}</Text>
                                <Column gap={1}>
                                    {selectedItem.getLastItem().isUsable && (
                                        <>
                                            <Button variant="primary" onClick={() => HotBarAddItem(selectedItem.getLastItem().id)}>
                                                Pin to Hotbar
                                            </Button>
                                            <Button variant="success" onClick={() => DeviceOpen(selectedItem.getLastItem().id)}>
                                                Use Device
                                            </Button>
                                        </>
                                    )}
                                    {!selectedItem.getLastItem().isUsable && !!roomSession && (
                                        <Button variant="primary" onClick={event => attemptItemPlacement(selectedItem)}>
                                            {LocalizeText('inventory.furni.placetoroom')}
                                        </Button>
                                    )}
                                    {(selectedItem && selectedItem.isSellable) && (
                                        <Button onClick={event => attemptPlaceMarketplaceOffer(selectedItem)}>
                                            {LocalizeText('inventory.marketplace.sell')}
                                        </Button>
                                    )}
                                </Column>
                            </Column>
                        </>
                    )
                }
            </Column>
        </Grid>
    );
}

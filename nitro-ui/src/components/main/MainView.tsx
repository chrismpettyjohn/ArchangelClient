import { useEffect } from 'react';
import { GetCommunication } from '../../api';
import { Base, Flex } from '../../common';
import { AchievementsView } from '../achievements/AchievementsView';
import { AvatarEditorView } from '../avatar-editor/AvatarEditorView';
import { CameraWidgetView } from '../camera/CameraWidgetView';
import { CampaignView } from '../campaign/CampaignView';
import { CatalogView } from '../catalog/CatalogView';
import { ChatHistoryView } from '../chat-history/ChatHistoryView';
import { FloorplanEditorView } from '../floorplan-editor/FloorplanEditorView';
import { GroupsView } from '../groups/GroupsView';
import { HcCenterView } from '../hc-center/HcCenterView';
import { ModToolsView } from '../mod-tools/ModToolsView';
import { NavigatorView } from '../navigator/NavigatorView';
import { NitropediaView } from '../nitropedia/NitropediaView';
import { RightSideView } from '../right-side/RightSideView';
import { RoomView } from '../room/RoomView';
import { WiredView } from '../wired/WiredView';
import { LeftSideView } from '../left-side/LeftSideView';
import { CorpTools } from '../roleplay-widgets/corp-tools/CorpTools';
import { Billing } from '../billing/Billing';
import { InventoryView } from '../inventory/InventoryView';
import { Devices } from '../roleplay-devices/Devices';
import { RoleplayEffects } from '../roleplay-widgets/roleplay-effects/RoleplayEffects';
import { MiddleView } from '../middle/MiddleView';
import { HotBarView } from '../roleplay-widgets/hotbar/HotBarView';
import { RoleplayWidgets } from '../roleplay-widgets/RoleplayWidgets';

export function MainView() {

    useEffect(() => {
        GetCommunication().connection.onReady();
    }, []);

    return (
        <div>
            <HotBarView />
            <Flex center className="nitro-chatbar">
                <Flex id="toolbar-chat-input-container" />
            </Flex>
            <ModToolsView />
            <RoomView />
            <ChatHistoryView />
            <WiredView />
            <AvatarEditorView />
            <AchievementsView />
            <NavigatorView />
            <InventoryView />
            <CatalogView />
            <LeftSideView />
            <MiddleView />
            <RightSideView />
            <GroupsView />
            <CameraWidgetView />
            <NitropediaView />
            <HcCenterView />
            <CampaignView />
            <FloorplanEditorView />
            <CorpTools />
            <Billing />
            <Devices />
            <RoleplayEffects />
            <RoleplayWidgets />
        </div>
    );
}

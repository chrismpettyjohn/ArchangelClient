import { CrackableDataType, GroupInformationComposer, GroupInformationEvent, NowPlayingEvent, RoomControllerLevel, RoomObjectCategory, RoomObjectOperationType, RoomObjectVariable, RoomWidgetEnumItemExtradataParameter, SetObjectDataMessageComposer, SongInfoReceivedEvent, StringDataType } from '@nitro-rp/renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AvatarInfoFurni, CreateLinkEvent, GetGroupInformation, GetNitroInstance, GetRoomEngine, LocalizeText, SendMessageComposer } from '../../../../../api';
import { Base, Button, Column, Flex, LayoutBadgeImageView, LayoutLimitedEditionCompactPlateView, LayoutRarityLevelView, Text } from '../../../../../common';
import { useMessageEvent, useRoom, useSoundEvent } from '../../../../../hooks';

interface InfoStandWidgetFurniViewProps {
    avatarInfo: AvatarInfoFurni;
    onClose: () => void;
}

const PICKUP_MODE_NONE: number = 0;
const PICKUP_MODE_EJECT: number = 1;
const PICKUP_MODE_FULL: number = 2;

export const InfoStandWidgetFurniView: FC<InfoStandWidgetFurniViewProps> = props => {
    const { avatarInfo = null, onClose = null } = props;
    const { roomSession = null } = useRoom();

    const [pickupMode, setPickupMode] = useState(0);
    const [furniKeys, setFurniKeys] = useState<string[]>([]);
    const [furniValues, setFurniValues] = useState<string[]>([]);
    const [customKeys, setCustomKeys] = useState<string[]>([]);
    const [customValues, setCustomValues] = useState<string[]>([]);
    const [isCrackable, setIsCrackable] = useState(false);
    const [crackableHits, setCrackableHits] = useState(0);
    const [crackableTarget, setCrackableTarget] = useState(0);
    const [godMode, setGodMode] = useState(false);
    const [groupName, setGroupName] = useState<string>(null);
    const [isJukeBox, setIsJukeBox] = useState<boolean>(false);
    const [isSongDisk, setIsSongDisk] = useState<boolean>(false);
    const [songId, setSongId] = useState<number>(-1);
    const [songName, setSongName] = useState<string>('');
    const [songCreator, setSongCreator] = useState<string>('');

    useSoundEvent<NowPlayingEvent>(NowPlayingEvent.NPE_SONG_CHANGED, event => {
        setSongId(event.id);
    }, (isJukeBox || isSongDisk));

    useSoundEvent<NowPlayingEvent>(SongInfoReceivedEvent.SIR_TRAX_SONG_INFO_RECEIVED, event => {
        if (event.id !== songId) return;

        const songInfo = GetNitroInstance().soundManager.musicController.getSongInfo(event.id);

        if (!songInfo) return;

        setSongName(songInfo.name);
        setSongCreator(songInfo.creator);
    }, (isJukeBox || isSongDisk));

    useEffect(() => {
        let pickupMode = PICKUP_MODE_NONE;
        let furniKeyss: string[] = [];
        let furniValuess: string[] = [];
        let customKeyss: string[] = [];
        let customValuess: string[] = [];
        let isCrackable = false;
        let crackableHits = 0;
        let crackableTarget = 0;
        let godMode = false;
        let furniIsJukebox = false;
        let furniIsSongDisk = false;
        let furniSongId = -1;

        const isValidController = (avatarInfo.roomControllerLevel >= RoomControllerLevel.GUEST);

        if (isValidController || avatarInfo.isOwner || avatarInfo.isRoomOwner || avatarInfo.isAnyRoomController) {

            if (avatarInfo.roomControllerLevel >= RoomControllerLevel.MODERATOR) godMode = true;
        }

        if (avatarInfo.extraParam) {
            if (avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI) {
                const stuffData = (avatarInfo.stuffData as CrackableDataType);

                isCrackable = true;
                crackableHits = stuffData.hits;
                crackableTarget = stuffData.target;
            }

            else if (avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) {
                const playlist = GetNitroInstance().soundManager.musicController.getRoomItemPlaylist();

                if (playlist) {
                    furniSongId = playlist.nowPlayingSongId;
                }

                furniIsJukebox = true;
            }

            else if (avatarInfo.extraParam.indexOf(RoomWidgetEnumItemExtradataParameter.SONGDISK) === 0) {
                furniSongId = parseInt(avatarInfo.extraParam.substr(RoomWidgetEnumItemExtradataParameter.SONGDISK.length));

                furniIsSongDisk = true;
            }

            if (godMode) {
                const extraParam = avatarInfo.extraParam.substr(RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS.length);

                if (extraParam) {
                    const parts = extraParam.split('\t');

                    for (const part of parts) {
                        const value = part.split('=');

                        if (value && (value.length === 2)) {
                            furniKeyss.push(value[0]);
                            furniValuess.push(value[1]);
                        }
                    }
                }
            }
        }

        if (godMode) {
            const roomObject = GetRoomEngine().getRoomObject(roomSession.roomId, avatarInfo.id, (avatarInfo.isWallItem) ? RoomObjectCategory.WALL : RoomObjectCategory.FLOOR);

            if (roomObject) {
                const customVariables = roomObject.model.getValue<string[]>(RoomObjectVariable.FURNITURE_CUSTOM_VARIABLES);
                const furnitureData = roomObject.model.getValue<{ [index: string]: string }>(RoomObjectVariable.FURNITURE_DATA);

                if (customVariables && customVariables.length) {
                    for (const customVariable of customVariables) {
                        customKeyss.push(customVariable);
                        customValuess.push((furnitureData[customVariable]) || '');
                    }
                }
            }
        }

        if (avatarInfo.isOwner || avatarInfo.isAnyRoomController) pickupMode = PICKUP_MODE_FULL;

        else if (avatarInfo.isRoomOwner || (avatarInfo.roomControllerLevel >= RoomControllerLevel.GUILD_ADMIN)) pickupMode = PICKUP_MODE_EJECT;

        if (avatarInfo.isStickie) pickupMode = PICKUP_MODE_NONE;

        setPickupMode(pickupMode);
        setFurniKeys(furniKeyss);
        setFurniValues(furniValuess);
        setCustomKeys(customKeyss);
        setCustomValues(customValuess);
        setIsCrackable(isCrackable);
        setCrackableHits(crackableHits);
        setCrackableTarget(crackableTarget);
        setGodMode(godMode);
        setGroupName(null);
        setIsJukeBox(furniIsJukebox);
        setIsSongDisk(furniIsSongDisk);
        setSongId(furniSongId);

        if (avatarInfo.groupId) SendMessageComposer(new GroupInformationComposer(avatarInfo.groupId, false));
    }, [roomSession, avatarInfo]);

    useMessageEvent<GroupInformationEvent>(GroupInformationEvent, event => {
        const parser = event.getParser();

        if (!avatarInfo || avatarInfo.groupId !== parser.id || parser.flag) return;

        if (groupName) setGroupName(null);

        setGroupName(parser.title);
    });

    useEffect(() => {
        const songInfo = GetNitroInstance().soundManager.musicController.getSongInfo(songId);

        setSongName(songInfo?.name ?? '');
        setSongCreator(songInfo?.creator ?? '');
    }, [songId]);

    const onFurniSettingChange = useCallback((index: number, value: string) => {
        const clone = Array.from(furniValues);

        clone[index] = value;

        setFurniValues(clone);
    }, [furniValues]);

    const onCustomVariableChange = useCallback((index: number, value: string) => {
        const clone = Array.from(customValues);

        clone[index] = value;

        setCustomValues(clone);
    }, [customValues]);

    const getFurniSettingsAsString = useCallback(() => {
        if (furniKeys.length === 0 || furniValues.length === 0) return '';

        let data = '';

        let i = 0;

        while (i < furniKeys.length) {
            const key = furniKeys[i];
            const value = furniValues[i];

            data = (data + (key + '=' + value + '\t'));

            i++;
        }

        return data;
    }, [furniKeys, furniValues]);

    const processButtonAction = useCallback((action: string) => {
        if (!action || (action === '')) return;

        switch (action) {
            case 'buy_one':
                CreateLinkEvent(`catalog/open/offerId/${avatarInfo.purchaseOfferId}`);
                return;
            case 'move':
                GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_MOVE);
                break;
            case 'rotate':
                GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                break;
            case 'pickup':
                if (pickupMode === PICKUP_MODE_FULL) {
                    GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_PICKUP);
                }
                else {
                    GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_EJECT);
                }
                break;
            case 'use':
                GetRoomEngine().useRoomObject(avatarInfo.id, avatarInfo.category);
                break;
            case 'save_branding_configuration': {
                const mapData = new Map<string, string>();
                const dataParts = getFurniSettingsAsString().split('\t');

                if (dataParts) {
                    for (const part of dataParts) {
                        const [key, value] = part.split('=', 2);

                        mapData.set(key, value);
                    }
                }

                GetRoomEngine().modifyRoomObjectDataWithMap(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_SAVE_STUFF_DATA, mapData);
                break;
            }
            case 'save_custom_variables': {
                const map = new Map();

                for (let i = 0; i < customKeys.length; i++) {
                    const key = customKeys[i];
                    const value = customValues[i];

                    if ((key && key.length) && (value && value.length)) map.set(key, value);
                }

                SendMessageComposer(new SetObjectDataMessageComposer(avatarInfo.id, map));
                break;
            }
        }
    }, [avatarInfo, pickupMode, customKeys, customValues, getFurniSettingsAsString]);

    const getGroupBadgeCode = useCallback(() => {
        const stringDataType = (avatarInfo.stuffData as StringDataType);

        if (!stringDataType || !(stringDataType instanceof StringDataType)) return null;

        return stringDataType.getValue(2);
    }, [avatarInfo]);

    if (!avatarInfo) return null;

    return (
        <Column gap={1} alignItems="end">
            <Column className="nitro-infostand rounded glass-panel">
                <Column overflow="visible" className="container-fluid content-area">
                    <Flex alignItems="center">
                        <Column fullWidth>
                            {avatarInfo.image && avatarInfo.image.src.length &&
                                <img className="d-block" src={avatarInfo.image.src} alt="" style={{ width: 50, height: 50, objectFit: 'cover' }} />}
                        </Column>
                        <Column fullWidth>
                            <Text variant="white" fontSize={6} wrap>{avatarInfo.name.toLowerCase()}</Text>
                        </Column>

                    </Flex>
                    {(isJukeBox || isSongDisk) &&
                        <Column gap={1}>
                            <hr className="m-0" />
                            {(songId === -1) &&
                                <Text variant="white" small wrap>
                                    {LocalizeText('infostand.jukebox.text.not.playing')}
                                </Text>}
                            {!!songName.length &&
                                <Flex alignItems="center" gap={1}>
                                    <Base className="icon disk-icon" />
                                    <Text variant="white" small wrap>
                                        {songName}
                                    </Text>
                                </Flex>}
                            {!!songCreator.length &&
                                <Flex alignItems="center" gap={1}>
                                    <Base className="icon disk-creator" />
                                    <Text variant="white" small wrap>
                                        {songCreator}
                                    </Text>
                                </Flex>}
                        </Column>}
                    <Column gap={1}>
                        {isCrackable &&
                            <>
                                <hr className="m-0" />
                                <Text variant="white" small wrap>{LocalizeText('infostand.crackable_furni.hits_remaining', ['hits', 'target'], [crackableHits.toString(), crackableTarget.toString()])}</Text>
                            </>}
                        {avatarInfo.groupId > 0 &&
                            <>
                                <hr className="m-0" />
                                <Flex pointer alignItems="center" gap={2} onClick={() => GetGroupInformation(avatarInfo.groupId)}>
                                    <LayoutBadgeImageView badgeCode={getGroupBadgeCode()} isGroup={true} />
                                    <Text variant="white" underline>{groupName}</Text>
                                </Flex>
                            </>}
                        {godMode &&
                            <>
                                <hr className="m-0" />
                                {(furniKeys.length > 0) &&
                                    <>
                                        <hr className="m-0" />
                                        <Column gap={1}>
                                            {furniKeys.map((key, index) => {
                                                return (
                                                    <Flex key={index} alignItems="center" gap={1}>
                                                        <Text small wrap align="end" variant="white" className="col-4">{key}</Text>
                                                        <input type="text" className="form-control form-control-sm" value={furniValues[index]} onChange={event => onFurniSettingChange(index, event.target.value)} />
                                                    </Flex>);
                                            })}
                                        </Column>
                                    </>}
                            </>}
                        {(customKeys.length > 0) &&
                            <>
                                <hr className="m-0 my-1" />
                                <Column gap={1}>
                                    {customKeys.map((key, index) => {
                                        return (
                                            <Flex key={index} alignItems="center" gap={1}>
                                                <Text small wrap align="end" variant="white" className="col-4">{key}</Text>
                                                <input type="text" className="form-control form-control-sm" value={customValues[index]} onChange={event => onCustomVariableChange(index, event.target.value)} />
                                            </Flex>);
                                    })}
                                </Column>
                            </>}
                    </Column>
                </Column>
            </Column>
            <Flex gap={1} justifyContent="end" style={{ padding: 4 }}>
                {(pickupMode !== PICKUP_MODE_NONE) &&
                    <>
                        <Button variant="dark" onClick={() => processButtonAction('use')}>
                            {LocalizeText('infostand.button.use')}
                        </Button>
                        <Button variant="dark" onClick={() => processButtonAction('move')}>
                            {LocalizeText('infostand.button.move')}
                        </Button>
                        <Button variant="dark" onClick={() => processButtonAction('pickup')}>
                            {LocalizeText((pickupMode === PICKUP_MODE_EJECT) ? 'infostand.button.eject' : 'infostand.button.pickup')}
                        </Button>
                    </>
                }
                {((furniKeys.length > 0 && furniValues.length > 0) && (furniKeys.length === furniValues.length)) &&
                    <Button variant="dark" onClick={() => processButtonAction('save_branding_configuration')}>
                        {LocalizeText('save')}
                    </Button>}
                {((customKeys.length > 0 && customValues.length > 0) && (customKeys.length === customValues.length)) &&
                    <Button variant="dark" onClick={() => processButtonAction('save_custom_variables')}>
                        {LocalizeText('save')}
                    </Button>}
            </Flex>
        </Column>
    );
}

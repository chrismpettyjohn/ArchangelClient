import { ILinkEventTracker, PlayerWeaponCreateComposer, PlayerWeaponDeleteComposer, PlayerWeaponListEvent, PlayerWeaponListRow, PlayerWeaponQueryListComposer, WeaponListEvent, WeaponListRow, WeaponQueryListComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';
import { useRoleplayStats } from '../../../../hooks/roleplay/use-rp-stats';
import { WeaponSelect } from '../../../roleplay/WeaponSelect';

export function ModToolsUserWeaponsManagerView() {
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<number>();
    const rpStats = useRoleplayStats(userId);
    const [newWeapon, setNewWeapon] = useState<WeaponListRow>();
    const [playerWeapons, setPlayerWeapons] = useState<PlayerWeaponListRow[]>([]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        SendMessageComposer(new PlayerWeaponQueryListComposer())
    }, [userId]);

    useMessageEvent(PlayerWeaponListEvent, (event: PlayerWeaponListEvent) => {
        console.log(event.getParser().playerWeapons)
        setPlayerWeapons(event.getParser().playerWeapons);
        setLoading(false);
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                const playerId = Number(parts[2]);
                setUserId(playerId);
            },
            eventUrlPrefix: 'staff/player-weapons-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setUserId]);

    const onChangeNewWeapon = useCallback((weapon: WeaponListRow) => {
        setNewWeapon(weapon);
    }, [setNewWeapon]);

    const onAddWeapon = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (!newWeapon || loading) {
            return;
        }
        SendMessageComposer(new PlayerWeaponCreateComposer(newWeapon.id, userId))
        setLoading(true);
        setNewWeapon(undefined);
    }, [setLoading, loading, newWeapon]);

    const onDeleteWeapon = useCallback((playerWeaponId: number) => {
        if (loading) {
            return;
        }
        SendMessageComposer(new PlayerWeaponDeleteComposer(playerWeaponId))
        setLoading(true);
    }, [setLoading, loading]);


    if (!userId) {
        return null;
    }

    console.log({ loading })

    return (
        <NitroCardView uniqueKey="staff-player-weapons" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText={`${rpStats.username}'s Weapons`} onCloseClick={() => setUserId(undefined)} />
            <NitroCardContentView className="h-100">
                <input className="form-control form-control-sm" placeholder="Search weapons..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Display Name</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Type</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Ammo</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            playerWeapons.map(_ => (
                                <tr key={`weapon_${_.id}`}>
                                    <td>
                                        <Text variant="white">{_.displayName}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.type}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.ammoRemaining} / {_.ammoCapacity}</Text>
                                    </td>
                                    <td>
                                        <FaTrashAlt style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} onClick={() => onDeleteWeapon(_.id)} />
                                        <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} onClick={() => CreateLinkEvent(`staff/player-weapons-manager/edit/${_.id}`)} />
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td>
                                <WeaponSelect weaponID={newWeapon?.id} onChange={onChangeNewWeapon} />
                            </td>
                            <td><Text variant="white">{newWeapon?.type}</Text></td>
                            <td><Text variant="white">{newWeapon?.ammoCapacity}/{newWeapon?.ammoCapacity}</Text></td>
                            <td>
                                <Button variant="success" disabled={loading} onClick={onAddWeapon}>
                                    <FaPlusCircle style={{ marginRight: 8 }} />
                                    Give
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </NitroCardContentView>
        </NitroCardView>
    );
}

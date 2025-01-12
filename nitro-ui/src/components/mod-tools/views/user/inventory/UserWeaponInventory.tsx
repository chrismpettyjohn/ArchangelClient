import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Text } from "../../../../../common";
import { ILinkEventTracker, PlayerWeaponCreateComposer, PlayerWeaponDeleteComposer, PlayerWeaponListEvent, PlayerWeaponListRow, PlayerWeaponQueryListComposer, WeaponListRow } from "@nitro-rp/renderer";
import { SendMessageComposer } from "../../../../../api";
import { useMessageEvent } from "../../../../../hooks";
import { WeaponSelect } from "../../../../roleplay/WeaponSelect";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";

export interface UserWeaponInventoryProps {
    userId: number;
}

export function UserWeaponInventory({ userId }: UserWeaponInventoryProps) {
    const [loading, setLoading] = useState(false);
    const [newWeapon, setNewWeapon] = useState<WeaponListRow>();
    const [playerWeapons, setPlayerWeapons] = useState<PlayerWeaponListRow[]>([]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        SendMessageComposer(new PlayerWeaponQueryListComposer(userId))
    }, [userId]);

    useMessageEvent(PlayerWeaponListEvent, (event: PlayerWeaponListEvent) => {
        setPlayerWeapons(event.getParser().playerWeapons);
        setLoading(false);
    })

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

    return (
        <>
            <input className="form-control form-control-sm" placeholder="Search weapons..." />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            <Text variant="white">Display Name</Text>
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
                                    <FaTrashAlt style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} onClick={() => onDeleteWeapon(_.id)} />
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td>
                            <WeaponSelect weaponID={newWeapon?.id} onChange={onChangeNewWeapon} />
                        </td>
                        <td>
                            <Button variant="success" disabled={loading} onClick={onAddWeapon}>
                                <FaPlusCircle style={{ marginRight: 8 }} />
                                Give
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
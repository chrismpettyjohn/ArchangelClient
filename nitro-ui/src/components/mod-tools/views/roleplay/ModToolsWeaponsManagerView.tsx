import { ILinkEventTracker, WeaponListEvent, WeaponListRow, WeaponQueryListComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsWeaponsManagerView() {
    const [visible, setVisible] = useState(false);
    const [weapons, setWeapons] = useState<WeaponListRow[]>([]);

    useEffect(() => {
        if (!visible) {
            return;
        }
        SendMessageComposer(new WeaponQueryListComposer())
    }, [visible]);

    useMessageEvent(WeaponListEvent, (event: WeaponListEvent) => {
        setWeapons(event.getParser().weapons);
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 3) return;

                switch (parts[2]) {
                    case 'toggle':
                        setVisible(prevValue => !prevValue);
                        return;
                }
            },
            eventUrlPrefix: 'staff/weapons-manager'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setVisible]);

    if (!visible) {
        return null;
    }

    return (
        <NitroCardView uniqueKey="staff-weapons" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 400 }}>
            <NitroCardHeaderView headerText="Weapons Manager" onCloseClick={() => setVisible(false)} />
            <NitroCardContentView className="h-100">
                <input className="form-control form-control-sm" placeholder="Search weapons..." />
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">
                                <Text variant="white">Identifier</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Display Name</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Damage</Text>
                            </th>
                            <th scope="col">
                                <Text variant="white">Actions</Text>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            weapons.map(_ => (
                                <tr key={`weapon_${_.id}`}>
                                    <td>
                                        <Text variant="white">{_.uniqueName}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.displayName}</Text>
                                    </td>
                                    <td>
                                        <Text variant="white">{_.minDamage} - {_.maxDamage}</Text>
                                    </td>
                                    <td>
                                        <FaTrashAlt style={{ color: 'red', cursor: 'pointer', marginRight: 8 }} />
                                        <FaPencilAlt style={{ color: 'blue', cursor: 'pointer' }} onClick={() => CreateLinkEvent(`staff/weapons-manager/edit/${_.id}`)} />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary">
                        <FaPlusCircle style={{ marginRight: 4 }} />
                        Add Weapon
                    </Button>
                </div>
            </NitroCardContentView>
        </NitroCardView>
    );
}

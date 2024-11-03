import { ILinkEventTracker, WeaponData, WeaponDataEvent, WeaponQueryOneComposer, WeaponUpdateComposer } from '@nitro-rp/renderer';
import { AddEventLinkTracker, RemoveLinkEventTracker, SendMessageComposer } from '../../../../api';
import { Button, DraggableWindowPosition, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { ChangeEvent, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { FaPencilAlt, FaSpinner } from 'react-icons/fa';
import { ChatWidgetOverlay } from '../../../chat-widget-overlay/ChatWidgetOverlay';
import { useMessageEvent } from '../../../../hooks';

export function ModToolsWeaponsManagerEditor() {
    const [loading, setLoading] = useState(false);
    const [weaponID, setWeaponID] = useState<number>();
    const [weaponData, setWeaponData] = useState<WeaponData>();

    useEffect(() => {
        if (!weaponID) {
            return;
        }
        SendMessageComposer(new WeaponQueryOneComposer(weaponID));
    }, [weaponID]);

    useMessageEvent(WeaponDataEvent, (event: WeaponDataEvent) => {
        setWeaponData(event.getParser().weapon)
        setLoading(false);
    })

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');

                if (parts.length < 4) return;

                const weaponID = parts[3];

                if (!weaponID) {
                    return;
                }

                setWeaponID(Number(weaponID));
            },
            eventUrlPrefix: 'staff/weapons-manager/edit'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [setWeaponID]);

    const onChange = useCallback((event: ChangeEvent<any>) => {
        setWeaponData(_ => ({
            ..._,
            [event.target.name]: event.target.value ?? '',
        }))
    }, [setWeaponData]);

    const onSubmit = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        if (loading) {
            return;
        }
        SendMessageComposer(new WeaponUpdateComposer(weaponID, weaponData.unequipMessage, weaponData.displayName, weaponData.minDamage, weaponData.maxDamage, weaponData.range, weaponData.accuracy, weaponData.reloadTime, weaponData.reloadMessage, weaponData.ammoCapacity, weaponData.weight, weaponData.cooldown, weaponData.equipEffect, weaponData.equipMessage, weaponData.unequipMessage, weaponData.attackMessage))
        setLoading(true);
    }, [weaponData, loading]);

    if (!weaponID) {
        return null;
    }

    return (
        <ChatWidgetOverlay visible>
            <NitroCardView uniqueKey="staff-weapons" className="nitro-mod-tools" windowPosition={DraggableWindowPosition.TOP_LEFT} theme="primary-slim" style={{ width: 400, height: 600 }}>
                <NitroCardHeaderView headerText="Weapons Manager" onCloseClick={() => setWeaponID(undefined)} />
                <NitroCardContentView className="h-100">
                    {
                        !loading && !!weaponData
                            ? (
                                <>
                                    <form onSubmit={onSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Identifier</Text>
                                            <input className="form-control form-control-sm" placeholder="hk-mp5" type="text" name="uniqueName" value={weaponData.uniqueName} onChange={onChange} />
                                        </div>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Display Name</Text>
                                            <input className="form-control form-control-sm" placeholder="HK MP5" type="text" name="displayName" value={weaponData.displayName} onChange={onChange} />
                                        </div>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Special Abilities</Text>
                                            <input className="form-control form-control-sm" placeholder="5" type="number" />
                                        </div>
                                        <Grid columnCount={2}>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Type</Text>
                                                <input className="form-control form-control-sm" placeholder="5" type="number" name="type" value={weaponData.type} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Weight</Text>
                                                <input className="form-control form-control-sm" placeholder="3" type="number" name="weight" value={weaponData.weight} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Ammo Capacity</Text>
                                                <input className="form-control form-control-sm" placeholder="30" type="number" name="ammoCapacity" value={weaponData.ammoCapacity} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Min. Damage</Text>
                                                <input className="form-control form-control-sm" placeholder="7" type="number" name="minDamage" value={weaponData.minDamage} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Max. Damage</Text>
                                                <input className="form-control form-control-sm" placeholder="15" type="number" name="maxDamage" value={weaponData.maxDamage} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Accuracy</Text>
                                                <input className="form-control form-control-sm" placeholder="8" type="number" name="accuracy" value={weaponData.accuracy} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Range</Text>
                                                <input className="form-control form-control-sm" placeholder="8" type="number" name="range" value={weaponData.range} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Cooldown</Text>
                                                <input className="form-control form-control-sm" placeholder="5" type="number" name="cooldown" value={weaponData.cooldown} onChange={onChange} />
                                            </div>
                                            <div>
                                                <Text bold fontSize={5} variant="white">Reload Time</Text>
                                                <input className="form-control form-control-sm" placeholder="5" type="number" name="reloadTime" value={weaponData.reloadTime} onChange={onChange} />
                                            </div>
                                        </Grid>
                                        <hr />
                                        <div>
                                            <Text bold fontSize={5} variant="white">Equip Effect</Text>
                                            <input className="form-control form-control-sm" placeholder="5" type="number" name="equipEffect" value={weaponData.equipEffect} onChange={onChange} />
                                        </div>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Equip Message</Text>
                                            <input className="form-control form-control-sm" placeholder="5" type="text" name="equipMessage" value={weaponData.equipMessage} onChange={onChange} />
                                        </div>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Reload Message</Text>
                                            <input className="form-control form-control-sm" placeholder="5" type="text" name="reloadMessage" value={weaponData.reloadMessage} onChange={onChange} />
                                        </div>
                                        <div>
                                            <Text bold fontSize={5} variant="white">Holster Message</Text>
                                            <input className="form-control form-control-sm" placeholder="5" type="text" name="unequipMessage" value={weaponData.unequipMessage} onChange={onChange} />
                                        </div>
                                    </form>

                                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button disabled={loading} variant="primary" onClick={onSubmit}>
                                            <FaPencilAlt style={{ marginRight: 4 }} />
                                            Save
                                        </Button>
                                    </div>
                                </>
                            )
                            : (
                                <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <FaSpinner className="fa-spin fa-4x" />
                                </div>
                            )
                    }
                </NitroCardContentView>
            </NitroCardView>
        </ChatWidgetOverlay>
    );
}

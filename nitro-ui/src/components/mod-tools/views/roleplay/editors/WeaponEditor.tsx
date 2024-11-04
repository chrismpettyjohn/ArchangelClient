import { WeaponData, WeaponType } from "@nitro-rp/renderer";
import { Button, Grid, Text } from "../../../../../common";
import { SyntheticEvent, useCallback, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

export type WeaponDTO = Omit<WeaponData, 'id'>

export interface WeaponEditorProps {
    defaultWeapon?: WeaponData;
    onSubmit(data: WeaponDTO): void;
}

export function WeaponEditor({ defaultWeapon, onSubmit }: WeaponEditorProps) {
    const [weapon, setWeapon] = useState<WeaponDTO>({
        uniqueName: defaultWeapon?.uniqueName ?? '',
        displayName: defaultWeapon?.displayName ?? '',
        type: defaultWeapon?.type ?? WeaponType.MELEE,
        minDamage: defaultWeapon?.minDamage ?? 1,
        maxDamage: defaultWeapon?.maxDamage ?? 1,
        range: defaultWeapon?.range ?? 1,
        accuracy: defaultWeapon?.accuracy ?? 1,
        reloadTime: defaultWeapon?.reloadTime ?? 0,
        reloadMessage: defaultWeapon?.reloadMessage ?? '',
        ammoCapacity: defaultWeapon?.ammoCapacity ?? 0,
        weight: defaultWeapon?.weight ?? 0,
        cooldown: defaultWeapon?.cooldown ?? 0,
        specialAbilities: defaultWeapon?.specialAbilities ?? '',
        equipEffect: defaultWeapon?.equipEffect ?? 0,
        equipMessage: defaultWeapon?.equipMessage ?? '',
        unequipMessage: defaultWeapon?.unequipMessage ?? '',
        attackMessage: defaultWeapon?.attackMessage ?? '',
    })

    const onChange = useCallback((changes: Partial<WeaponDTO>) => {
        setWeapon(_ => ({
            ..._,
            ...changes,
        }));
    }, [setWeapon]);

    const onSave = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(weapon);
    }, [weapon, onSubmit]);

    return (
        <>
            <form onSubmit={onSave} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                <div>
                    <Text bold fontSize={5} variant="white">Identifier</Text>
                    <input className="form-control form-control-sm" placeholder="hk-mp5" type="text" value={weapon.uniqueName} onChange={e => onChange({ uniqueName: e.target.value ?? '' })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Display Name</Text>
                    <input className="form-control form-control-sm" placeholder="HK MP5" type="text" value={weapon.uniqueName} onChange={e => onChange({ uniqueName: e.target.value ?? '' })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Special Abilities</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.uniqueName} onChange={e => onChange({ uniqueName: e.target.value ?? '' })} />
                </div>
                <Grid columnCount={2}>
                    <div>
                        <Text bold fontSize={5} variant="white">Type</Text>
                        <input className="form-control form-control-sm" placeholder="5" type="number" />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Weight</Text>
                        <input className="form-control form-control-sm" placeholder="3" type="number" value={weapon.uniqueName} onChange={e => onChange({ uniqueName: e.target.value ?? '' })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Ammo Capacity</Text>
                        <input className="form-control form-control-sm" placeholder="30" type="number" value={weapon.uniqueName} onChange={e => onChange({ uniqueName: e.target.value ?? '' })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Min. Damage</Text>
                        <input className="form-control form-control-sm" placeholder="7" type="number" value={weapon.minDamage} onChange={e => onChange({ minDamage: Number(e.target.value ?? 0) })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Max. Damage</Text>
                        <input className="form-control form-control-sm" placeholder="15" type="number" value={weapon.maxDamage} onChange={e => onChange({ maxDamage: Number(e.target.value ?? 0) })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Range</Text>
                        <input className="form-control form-control-sm" placeholder="8" type="number" value={weapon.range} onChange={e => onChange({ range: Number(e.target.value ?? 0) })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Cooldown</Text>
                        <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.cooldown} onChange={e => onChange({ cooldown: Number(e.target.value ?? 0) })} />
                    </div>
                    <div>
                        <Text bold fontSize={5} variant="white">Reload Time</Text>
                        <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.reloadTime} onChange={e => onChange({ reloadTime: Number(e.target.value ?? 0) })} />
                    </div>
                </Grid>
                <hr />
                <div>
                    <Text bold fontSize={5} variant="white">Equip Effect</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.equipEffect} onChange={e => onChange({ equipEffect: Number(e.target.value ?? 0) })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Equip Message</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.equipMessage} onChange={e => onChange({ equipMessage: e.target.value ?? '' })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Reload Message</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.reloadMessage} onChange={e => onChange({ reloadMessage: e.target.value ?? '' })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Holster Message</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" value={weapon.unequipMessage} onChange={e => onChange({ unequipMessage: e.target.value ?? '' })} />
                </div>
            </form>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={onSave}>
                    <FaPencilAlt style={{ marginRight: 4 }} />
                    Save
                </Button>
            </div>
        </>
    )
}
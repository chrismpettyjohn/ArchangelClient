import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';

export enum WeaponType {
    GUN = "gun",
    MELEE = "melee"
}

export interface PlayerWeaponListRow {
    id: number;
    weaponId: number;
    displayName: string;
    type: WeaponType;
    ammoRemaining: number;
    ammoCapacity: number;
}

export class PlayerWeaponListEventParser implements IMessageParser {
    private _playerWeapons: PlayerWeaponListRow[] = [];

    public flush(): boolean {
        this._playerWeapons = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const [id, weaponId, displayName, type, ammoRemaining, ammoCapacity] = wrapper.readString().split(';');

        this._playerWeapons.push({
            id: Number(id),
            weaponId: Number(weaponId),
            displayName,
            type: WeaponType[type as keyof typeof WeaponType],
            ammoRemaining: Number(ammoRemaining),
            ammoCapacity: Number(ammoCapacity),
        })

        return true;
    }

    public get playerWeapon(): PlayerWeaponListRow[] {
        return this._playerWeapons;
    }
}

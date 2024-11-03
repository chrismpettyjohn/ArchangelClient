import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { WeaponType } from './PlayerWeaponListEventParser';

export interface WeaponListRow {
    id: number;
    uniqueName: string;
    displayName: string;
    type: WeaponType;
    minDamage: number;
    maxDamage: number;
    accuracy: number;
    ammoCapacity: number;
}

export class WeaponListEventParser implements IMessageParser {
    private _weapons: WeaponListRow[] = [];


    public flush(): boolean {
        this._weapons = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const weaponCount = wrapper.readInt();

        for (let i = 0; i < weaponCount; i++) {
            const [id, displayName, uniqueName, type, minDamage, maxDamage, accuracy, ammoCapacity] = wrapper.readString().split(';');
            this._weapons.push({
                id: Number(id),
                displayName,
                uniqueName,
                type: WeaponType[type as keyof typeof WeaponType],
                minDamage: Number(minDamage),
                maxDamage: Number(maxDamage),
                accuracy: Number(accuracy),
                ammoCapacity: Number(ammoCapacity),
            })
        }

        return true;
    }

    public get weapons(): WeaponListRow[] {
        return this._weapons;
    }
}

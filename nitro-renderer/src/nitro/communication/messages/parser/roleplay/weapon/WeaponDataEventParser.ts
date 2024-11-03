import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { WeaponType } from './PlayerWeaponListEventParser';

export interface WeaponData {
    id: number;
    uniqueName: string;
    displayName: string;
    type: WeaponType;
    minDamage: number;
    maxDamage: number;
    range: number;
    accuracy: number;
    reloadTime: number;
    reloadMessage: string;
    ammoCapacity: number;
    weight: number;
    cooldown: number;
    specialAbilities: string;
    equipEffect: number;
    equipMessage: string;
    unequipMessage: string;
    attackMessage: string;
}

export class WeaponDataEventParser implements IMessageParser {
    private _id: number;
    private _uniqueName: string;
    private _displayName: string;
    private _type: WeaponType;
    private _minDamage: number;
    private _maxDamage: number;
    private _range: number;
    private _accuracy: number;
    private _reloadTime: number;
    private _reloadMessage: string;
    private _ammoCapacity: number;
    private _weight: number;
    private _cooldown: number;
    private _specialAbilities: string;
    private _equipEffect: number;
    private _equipMessage: string;
    private _unequipMessage: string;
    private _attackMessage: string;

    public flush(): boolean {
        this._id = -1;
        this._uniqueName = '';
        this._displayName = '';
        this._type = WeaponType.MELEE;
        this._minDamage = -1;
        this._maxDamage = -1;
        this._range = -1;
        this._accuracy = -1;
        this._reloadTime = -1;
        this._reloadMessage = '';
        this._ammoCapacity = -1;
        this._weight = -1;
        this._cooldown = -1;
        this._specialAbilities = '';
        this._equipEffect = -1;
        this._equipMessage = '';
        this._unequipMessage = '';
        this._attackMessage = '';

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._uniqueName = wrapper.readString();
        this._displayName = wrapper.readString();
        this._type = parseWeaponType(wrapper.readString());
        this._minDamage = wrapper.readInt();
        this._maxDamage = wrapper.readInt();
        this._range = wrapper.readInt();
        this._accuracy = wrapper.readInt();
        this._reloadTime = wrapper.readInt();
        this._reloadMessage = wrapper.readString();
        this._ammoCapacity = wrapper.readInt();
        this._weight = wrapper.readInt();
        this._cooldown = wrapper.readInt();
        this._specialAbilities = wrapper.readString();
        this._equipEffect = wrapper.readInt();
        this._equipMessage = wrapper.readString();
        this._unequipMessage = wrapper.readString();
        this._attackMessage = wrapper.readString();

        return true;
    }

    public get weapon(): WeaponData {
        return {
            id: this._id,
            uniqueName: this._uniqueName,
            displayName: this._displayName,
            type: this._type,
            minDamage: this._minDamage,
            maxDamage: this._maxDamage,
            range: this._range,
            accuracy: this._accuracy,
            reloadTime: this._reloadTime,
            reloadMessage: this._reloadMessage,
            ammoCapacity: this._ammoCapacity,
            weight: this._weight,
            cooldown: this._cooldown,
            specialAbilities: this._specialAbilities,
            equipEffect: this._equipEffect,
            equipMessage: this._equipMessage,
            unequipMessage: this._unequipMessage,
            attackMessage: this._attackMessage,
        }
    }
}

export function parseWeaponType(type: string): WeaponType | null {
    if (Object.values(WeaponType).includes(type as WeaponType)) {
        return type as WeaponType;
    } else {
        console.error(`Invalid weapon type: ${type}`);
        return null;
    }
}

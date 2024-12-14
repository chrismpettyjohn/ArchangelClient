import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum AmmoType {
    STANDARD = "standard",
    FMJ = "fmj",
    STUN = "stun",
    ARMOR_PIERCING = "ap"
}

export function parseAmmoType(typeName: string): AmmoType {
    const type = (Object.values(AmmoType) as string[]).find(
        (value) => value.toLowerCase() === typeName.toLowerCase()
    );
    if (!type) {
        throw new Error(`No enum constant with typeName: ${typeName}`);
    }
    return type as AmmoType;
}

export function parseAmmoSize(typeName: string): AmmoSize {
    const size = (Object.values(AmmoSize) as string[]).find(
        (value) => value.toLowerCase() === typeName.toLowerCase()
    );
    if (!size) {
        throw new Error(`No enum constant with typeName: ${typeName}`);
    }
    return size as AmmoSize;
}

export enum AmmoSize {
    _556_45 = "556x45",
    _762_39 = "762x39",
    _762_51 = "762x51",
    _9MM = "9mm",
    _45ACP = "45acp",
    STUN_CARTRIDGE = "stun_cartridge",
    HEALTH_SYRINGE = "health_syringe"
}

export interface MyAmmoData {
    id: number;
    itemID: number;
    uniqueName: string;
    displayName: string;
    size: AmmoSize;
    type: AmmoType;
}

export class MyAmmoListEventParser implements IMessageParser {
    private _ammo: MyAmmoData[];

    public flush(): boolean {
        this._ammo = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._ammo = [];

        while (true) {
            try {
                const ammoStr = wrapper.readString().split(';')
                this._ammo.push({
                    id: Number(ammoStr[0]),
                    itemID: Number(ammoStr[1]),
                    uniqueName: ammoStr[2],
                    displayName: ammoStr[3],
                    size: parseAmmoSize(ammoStr[4]),
                    type: parseAmmoType(ammoStr[5]),
                })
            } catch (e) {
                break;
            }
        }

        return true;
    }

    public get data(): MyAmmoData[] {
        return this._ammo;
    }
}

import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface MyWeaponData {
    id: number;
    itemID: number;
    uniqueName: string;
    displayName: string;
    equipEffect: number;
    magazineSize: number;
}

export class MyWeaponListParser implements IMessageParser {
    private _weapons: MyWeaponData[];
    private _

    public flush(): boolean {
        this._weapons = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._weapons = [];

        while (true) {
            try {
                const weaponStr = wrapper.readString().split(';')
                this._weapons.push({
                    id: Number(weaponStr[0]),
                    itemID: Number(weaponStr[1]),
                    uniqueName: weaponStr[2],
                    displayName: weaponStr[3],
                    equipEffect: Number(weaponStr[4]),
                    magazineSize: Number(weaponStr[5]),
                })
            } catch (e) {
                break;
            }
        }

        return true;
    }

    public get data(): MyWeaponData[] {
        return this._weapons;
    }
}

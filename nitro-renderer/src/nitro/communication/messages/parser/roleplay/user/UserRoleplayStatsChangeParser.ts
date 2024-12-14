import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { CorpIndustry } from "../corp/CorpListEventParser";

export interface UserRoleplayStatsChangeData {
    userID: number;
    username: string;
    figure: string;
    motto: string;
    joinedAt: number;
    lastLogin: number;
    online: boolean;
    cashBalance: number;
    bankBalance: number;
    isDead: boolean;
    isStunned: boolean;
    isCuffed: boolean;
    escortedByUserID: number;
    healthNow: number;
    healthMax: number;
    energyNow: number;
    energyMax: number;
    hungerNow: number;
    hungerMax: number;
    equippedWeaponID?: number;
    equippedWeaponAmmoLeft?: number;
    corporationID: number;
    corpName: string;
    corpIndustry: CorpIndustry;
    corporationPositionID: number;
    corpRoleName: string;
    isWorking: boolean;
    gangID: number;
    gangName: string;
    gangRoleID: number;
    gangRoleName: string;
}


export class UserRoleplayStatsChangeParser implements IMessageParser {
    private _userID: number;
    private _username: string;
    private _figure: string;
    private _motto: string;
    private _joinedAt: number;
    private _lastLogin: number;
    private _online: boolean;
    private _cashBalance: number;
    private _bankBalance: number;
    private _isDead: boolean;
    private _isStunned: boolean;
    private _isCuffed: boolean;
    private _isWorking: boolean;
    private _escortedByUserID: number;
    private _healthNow: number;
    private _healthMax: number;
    private _energyNow: number;
    private _energyMax: number;
    private _hungerNow: number;
    private _hungerMax: number;
    private _equippedWeaponID?: number;
    private _equippedWeaponAmmoLeft?: number;
    private _corporationID: number;
    private _corpName: string;
    private _corpIndustry: CorpIndustry;
    private _corporationPositionID: number;
    private _corpRoleName: string;
    private _gangID: number;
    private _gangName: string;
    private _gangRoleID?: number;
    private _gangRoleName: string;

    public flush(): boolean {
        this._userID = 0;
        this._username = '';
        this._figure = '';
        this._motto = '';
        this._joinedAt = -1;
        this._lastLogin = -1;
        this._online = false;
        this._cashBalance = 0;
        this._bankBalance = 0;
        this._isDead = false;
        this._isStunned = false;
        this._isCuffed = false;
        this._isWorking = false;
        this._escortedByUserID = 0;
        this._healthNow = 0;
        this._healthMax = 0;
        this._energyNow = 0;
        this._energyMax = 0;
        this._hungerNow = 0;
        this._hungerMax = 0;
        this._equippedWeaponID = 0;
        this._equippedWeaponAmmoLeft = 0;
        this._corporationID = 0;
        this._corpName = '';
        this._corpIndustry = CorpIndustry.Bank;
        this._corporationPositionID = 0;
        this._corpRoleName = '';
        this._gangID = 0;
        this._gangName = '';
        this._gangRoleID = 0;
        this._gangRoleName = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            this._userID = wrapper.readInt();
            this._username = wrapper.readString();
            this._figure = wrapper.readString();
            this._motto = wrapper.readString();
            this._joinedAt = wrapper.readInt();
            this._lastLogin = wrapper.readInt();
            this._online = wrapper.readBoolean();
            this._cashBalance = wrapper.readInt();
            this._bankBalance = wrapper.readInt();
            this._isDead = wrapper.readBoolean();
            this._isStunned = wrapper.readBoolean();
            this._isCuffed = wrapper.readBoolean();
            this._isWorking = wrapper.readBoolean();
            this._escortedByUserID = wrapper.readInt();
            this._healthNow = wrapper.readInt();
            this._healthMax = wrapper.readInt();
            this._energyNow = wrapper.readInt();
            this._energyMax = wrapper.readInt();
            this._hungerNow = wrapper.readInt();
            this._hungerMax = wrapper.readInt();
            this._equippedWeaponID = wrapper.readInt();
            this._equippedWeaponAmmoLeft = wrapper.readInt();
            this._corporationID = wrapper.readInt();
            this._corpName = wrapper.readString();
            this._corpIndustry = parseCorpIndustry(wrapper.readString());
            this._corporationPositionID = wrapper.readInt();
            this._corpRoleName = wrapper.readString();
            this._gangID = wrapper.readInt();
            this._gangName = wrapper.readString();
            this._gangRoleID = wrapper.readInt();
            this._gangRoleName = wrapper.readString();
        } catch (e) {
            alert(e);
        }

        return true;
    }

    public get data(): UserRoleplayStatsChangeData {
        return {
            userID: this._userID,
            username: this._username,
            figure: this._figure,
            motto: this._motto,
            joinedAt: this._joinedAt,
            lastLogin: this._lastLogin,
            online: this._online,
            cashBalance: this._cashBalance,
            bankBalance: this._bankBalance,
            isDead: this._isDead,
            isStunned: this._isStunned,
            isCuffed: this._isCuffed,
            isWorking: this._isWorking,
            escortedByUserID: this._escortedByUserID,
            healthNow: this._healthNow,
            healthMax: this._healthMax,
            energyNow: this._energyNow,
            energyMax: this._energyMax,
            hungerNow: this._hungerNow,
            hungerMax: this._hungerMax,
            equippedWeaponID: this._equippedWeaponID,
            equippedWeaponAmmoLeft: this._equippedWeaponAmmoLeft,
            corporationID: this._corporationID,
            corpName: this._corpName,
            corpIndustry: this._corpIndustry,
            corporationPositionID: this._corporationPositionID,
            corpRoleName: this._corpRoleName,
            gangID: this._gangID,
            gangName: this._gangName,
            gangRoleID: this._gangRoleID,
            gangRoleName: this._gangRoleName,
        }
    }
}

export function parseCorpIndustry(type: string): CorpIndustry | null {
    if (Object.values(CorpIndustry).includes(type as CorpIndustry)) {
        return type as CorpIndustry;
    } else {
        console.error(`Invalid corp industry: ${type}`);
        return null;
    }
}

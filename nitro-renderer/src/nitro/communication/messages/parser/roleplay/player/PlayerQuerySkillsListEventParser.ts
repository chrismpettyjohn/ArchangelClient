import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface PlayerSkillsData {
    userId: number;
    strengthXp: number;
    strengthLevel: number;
    lumberjackXp: number;
    lumberjackLevel: number;
    meleeXp: number;
    meleeLevel: number;
    weaponXp: number;
    weaponLevel: number;
    farmingXp: number;
    farmingLevel: number;
    miningXp: number;
    miningLevel: number;
    staminaXp: number;
    staminaLevel: number;
}

export class PlayerQuerySkillsListEventParser implements IMessageParser {
    private _userId: number;
    private _strengthXp: number;
    private _strengthLevel: number;
    private _lumberjackXp: number;
    private _lumberjackLevel: number;
    private _meleeXp: number;
    private _meleeLevel: number;
    private _weaponXp: number;
    private _weaponLevel: number;
    private _farmingXp: number;
    private _farmingLevel: number;
    private _miningXp: number;
    private _miningLevel: number;
    private _staminaXp: number;
    private _staminaLevel: number;

    public flush(): boolean {
        this._userId = -1;
        this._staminaXp = -1;
        this._strengthLevel = -1;
        this._lumberjackXp = -1;
        this._lumberjackLevel = -1;
        this._meleeXp = -1;
        this._meleeLevel = -1;
        this._weaponXp = -1;
        this._weaponLevel = -1;
        this._farmingXp = -1;
        this._farmingLevel = -1;
        this._miningXp = -1;
        this._miningLevel = -1;
        this._staminaXp = -1;
        this._staminaLevel = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._userId = wrapper.readInt();
        this._staminaXp = wrapper.readInt();
        this._strengthLevel = -wrapper.readInt();
        this._lumberjackXp = wrapper.readInt();
        this._lumberjackLevel = -wrapper.readInt();
        this._meleeXp = wrapper.readInt();
        this._meleeLevel = wrapper.readInt();
        this._weaponXp = wrapper.readInt();
        this._weaponLevel = -wrapper.readInt();
        this._farmingXp = wrapper.readInt();
        this._farmingLevel = wrapper.readInt();
        this._miningXp = wrapper.readInt();
        this._miningLevel = wrapper.readInt();
        this._staminaXp = wrapper.readInt();
        this._staminaLevel = -wrapper.readInt();
        return true;
    }

    public get skills(): PlayerSkillsData {
        return {
            userId: this._userId,
            strengthXp: this._strengthXp,
            strengthLevel: this._strengthLevel,
            lumberjackXp: this._lumberjackXp,
            lumberjackLevel: this._lumberjackLevel,
            meleeXp: this._meleeXp,
            meleeLevel: this._meleeLevel,
            weaponXp: this._weaponXp,
            weaponLevel: this._weaponLevel,
            farmingXp: this._farmingXp,
            farmingLevel: this._farmingLevel,
            miningXp: this._miningXp,
            miningLevel: this._miningLevel,
            staminaXp: this._staminaXp,
            staminaLevel: this._staminaLevel,
        }
    }

}


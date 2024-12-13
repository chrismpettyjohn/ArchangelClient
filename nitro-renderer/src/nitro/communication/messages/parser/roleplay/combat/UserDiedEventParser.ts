import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface UserDiedData {
    victimUserId: number;
    victimUsername: string;
    victimLook: string;
    victimKills: number;
    attackerUserId: number;
    attackerUsername: string;
    attackerLook: string;
    attackerKills: number;
}

export class UserDiedEventParser implements IMessageParser {
    private _victimUserId: number;
    private _victimUsername: string;
    private _victimLook: string;
    private _victimKills: number;
    private _attackerUserId: number;
    private _attackerUsername: string;
    private _attackerLook: string;
    private _attackerKills: number;

    public flush(): boolean {
        this._victimUserId = -1;
        this._victimUsername = '';
        this._victimLook = '-';
        this._victimKills = -1;
        this._attackerUserId = -1;
        this._attackerUsername = '';
        this._attackerLook = '';
        this._attackerKills = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false

        this._victimUserId = wrapper.readInt();
        this._victimUsername = wrapper.readString();
        this._victimLook = wrapper.readString();
        this._attackerKills = wrapper.readInt();
        this._attackerUserId = wrapper.readInt();
        this._attackerUsername = wrapper.readString();
        this._attackerLook = wrapper.readString();
        this._attackerKills = wrapper.readInt();
        return true;
    }

    public get data(): UserDiedData {
        return {
            victimUserId: this._victimUserId,
            victimUsername: this._victimUsername,
            victimLook: this._victimLook,
            victimKills: this._victimKills,
            attackerUserId: this._attackerUserId,
            attackerUsername: this._attackerUsername,
            attackerLook: this._attackerLook,
            attackerKills: this._attackerKills,
        }
    }

}

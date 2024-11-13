import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { GangRoleData } from "./GangRoleQueryListEventParser";

export class GangRoleQueryOneEventParser implements IMessageParser {
    private _id: number;
    private _orderId: number;
    private _displayName: string;
    private _canInvite: boolean;
    private _canKick: boolean;

    public flush(): boolean {
        this._id = -1;
        this._orderId = -1;
        this._displayName = '';
        this._canInvite = false;
        this._canKick = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._orderId = wrapper.readInt();
        this._displayName = wrapper.readString();
        this._canInvite = wrapper.readBoolean();
        this._canKick = wrapper.readBoolean();

        return true;
    }

    public get role(): GangRoleData {
        return {
            id: this._id,
            orderId: this._orderId,
            displayName: this._displayName,
            canInvite: this._canInvite,
            canKick: this._canKick,
        }
    }
}

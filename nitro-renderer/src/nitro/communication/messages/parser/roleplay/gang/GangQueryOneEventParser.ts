import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { GangInfoData } from "./GangQueryListEventParser";

export class GangQueryOneEventParser implements IMessageParser {
    private _id: number;
    private _displayName: string;
    private _description: string;
    private _badgeCode: string;
    private _userID: number;
    private _roomID: number;

    public flush(): boolean {
        this._id = 0;
        this._displayName = '';
        this._description = '';
        this._badgeCode = '';
        this._userID = 0;
        this._roomID = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._displayName = wrapper.readString();
        this._description = wrapper.readString();
        this._badgeCode = wrapper.readString();
        this._userID = wrapper.readInt();
        this._roomID = wrapper.readInt();

        return true;
    }

    public get gang(): GangInfoData {
        return {
            id: this._id,
            userID: this._userID,
            roomID: this._roomID,
            displayName: this._displayName,
            description: this._description,
            badgeCode: this._badgeCode,
        }
    }
}

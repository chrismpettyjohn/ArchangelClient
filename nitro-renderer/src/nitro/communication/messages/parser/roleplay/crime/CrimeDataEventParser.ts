import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CrimeData {
    id: number;
    displayName: string;
    description: string;
    jailTime: number;
}

export class CrimeDataEventParser implements IMessageParser {
    private _id: number;
    private _displayName: string;
    private _description: string;
    private _jailTime: number;

    public flush(): boolean {
        this._id = -1;
        this._displayName = '';
        this._description = '';
        this._jailTime = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._displayName = wrapper.readString();
        this._description = wrapper.readString();
        this._jailTime = wrapper.readInt();

        return true;
    }

    public get crime(): CrimeData {
        return {
            id: this._id,
            displayName: this._displayName,
            description: this._description,
            jailTime: this._jailTime,
        }
    }

}

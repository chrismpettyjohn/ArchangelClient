import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";


export class CurrentEmailEventParser implements IMessageParser {
    private _email: string = '';
    private _success: boolean = false;

    public flush(): boolean {
        this._email = '';
        this._success = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._email = wrapper.readString();
        this._success = wrapper.readBoolean();
        return true;
    }

    public get email(): string {
        return this._email;
    }

    public get success(): boolean {
        return this._success;
    }
}

import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export class UserProfileBannerEventParser implements IMessageParser {
    private _url: string = '';
    private _userId: number;

    public flush(): boolean {
        this._url = '';
        this._userId = -1;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._url = wrapper.readString();
        this._userId = wrapper.readInt();

        return true;
    }

    public get url(): string {
        return this._url;
    }

    public get userId(): number {
        return this._userId;
    }
}

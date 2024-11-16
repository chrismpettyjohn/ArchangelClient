import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { UserGuestbookPost } from './UserGuestbookQueryListEventParser';

export class UserGuestbookQueryOneEventParser implements IMessageParser {
    private _id: number;
    private _userId: number;
    private _userName: string;
    private _userFigure: string;
    private _message: string;
    private _createdAt: number;
    private _updatedAt: number;

    flush(): boolean {
        this._id = -1;
        this._userId = -1;
        this._userName = '';
        this._userFigure = '';
        this._message = '';
        this._createdAt = -1;
        this._updatedAt = 1;
        return true;
    }
    parse(wrapper: IMessageDataWrapper): boolean {
        this._id = wrapper.readInt();
        this._userId = wrapper.readInt();
        this._userFigure = wrapper.readString();
        this._message = wrapper.readString();
        this._createdAt = wrapper.readInt();
        this._updatedAt = wrapper.readInt();
        return true;
    }

    public get post(): UserGuestbookPost {
        return {
            id: this._id,
            userId: this._userId,
            userName: this._userName,
            userFigure: this._userFigure,
            message: this._message,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
}

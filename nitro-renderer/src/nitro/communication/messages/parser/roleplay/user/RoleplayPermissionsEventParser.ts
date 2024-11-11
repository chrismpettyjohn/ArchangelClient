import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface RoleplayPermissionsData {
    canSeeAllRooms: boolean;
    canEditAllCorps: boolean;
    canEditAllUsers: boolean;
    canEditAllGangs: boolean;
}

export class RoleplayPermissionsEventParser implements IMessageParser {
    private _canSeeAllRooms: boolean;
    private _canEditAllCorps: boolean;
    private _canEditAllUsers: boolean;
    private _canEditAllGangs: boolean;

    public flush(): boolean {
        this._canSeeAllRooms = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._canSeeAllRooms = wrapper.readBoolean();
        this._canEditAllCorps = wrapper.readBoolean();
        this._canEditAllGangs = wrapper.readBoolean();
        this._canEditAllUsers = wrapper.readBoolean();

        return true;
    }

    public get data(): RoleplayPermissionsData {
        return {
            canSeeAllRooms: this._canSeeAllRooms,
            canEditAllCorps: this._canEditAllCorps,
            canEditAllGangs: this._canEditAllGangs,
            canEditAllUsers: this._canEditAllUsers,
        }
    }

    public get canSeeAllRooms(): boolean {
        return this._canSeeAllRooms;
    }
}

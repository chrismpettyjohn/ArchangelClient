import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangRoleData {
    id: number;
    orderId: number;
    displayName: string;
    canInvite: boolean;
    canKick: boolean;
}

export class GangRoleQueryListEventParser implements IMessageParser {
    private _roles: GangRoleData[];

    public flush(): boolean {
        this._roles = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const gangCount = wrapper.readInt();

        for (let i = 0; i < gangCount; i++) {
            const [id, orderId, displayName, canInvite, canKick] = wrapper.readString().split(';');
            this._roles.push({
                id: Number(id),
                orderId: Number(orderId),
                displayName,
                canInvite: Boolean(canInvite),
                canKick: Boolean(canKick),
            })
        }

        return true;
    }

    public get roles(): GangRoleData[] {
        return this._roles;
    }
}

import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangMemberData {
    userId: number;
    userName: string;
    userLook: string;
    roleId: number;
    roleName: string;
}

export class GangMemberQueryListEventParser implements IMessageParser {
    private _members: GangMemberData[];

    public flush(): boolean {
        this._members = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const gangCount = wrapper.readInt();

        for (let i = 0; i < gangCount; i++) {
            const [userId, userName, userLook, roleId, roleName] = wrapper.readString().split(';');
            this._members.push({
                userId: Number(userId),
                userName,
                userLook,
                roleId: Number(roleId),
                roleName,
            })
        }

        return true;
    }

    public get members(): GangMemberData[] {
        return this._members;
    }
}

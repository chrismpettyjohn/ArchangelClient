import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface GangInfoData {
    id: number;
    displayName: string;
    description: string;
    badgeCode: string;
    userID: number;
    roomID: number;
}

export class GangQueryListEventParser implements IMessageParser {
    private _gangs: GangInfoData[];

    public flush(): boolean {
        this._gangs = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const gangCount = wrapper.readInt();

        for (let i = 0; i < gangCount; i++) {
            const [id, displayName, description, badgeCode, userId, roomId] = wrapper.readString().split(';');
            this._gangs.push({
                id: Number(id),
                displayName,
                description,
                badgeCode,
                userID: Number(userId),
                roomID: Number(roomId),
            })
        }

        return true;
    }

    public get gangs(): GangInfoData[] {
        return this._gangs;
    }
}

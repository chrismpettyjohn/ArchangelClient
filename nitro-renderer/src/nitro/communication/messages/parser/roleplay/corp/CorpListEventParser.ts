import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpListData {
    id: number;
    displayName: string;
    badge: string;
    industry: string;
    sector: string;
    userId: number;
    userName: string;
    employeeCount: number;
}

export class CorpListEventParser implements IMessageParser {
    private _corps: CorpListData[];

    public flush(): boolean {
        this._corps = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalCorps = wrapper.readInt();

        for (let i = 0; i < totalCorps; i++) {
            const [id, displayName, badge, industry, sector, userId, userName, employeeCount] = wrapper.readString().split(';');
            this._corps.push({ id: Number(id), displayName, badge, industry, sector, userId: Number(userId), userName, employeeCount: Number(employeeCount) })
        }

        return true;
    }

    public get corps(): CorpListData[] {
        return this._corps;
    }

}

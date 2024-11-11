import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export enum CorpIndustry {
    Bank = "bank",
    DriversEd = "drivers-ed",
    Farm = "farm",
    Fish = "fish",
    Mine = "mine",
    Lumber = "lumber",
    GunStore = "gun-store",
    Retail = "retail",
    Hospital = "hospital",
    Paramedic = "paramedic",
    Police = "police",
    PublicAid = "public-aid",
}

export enum CorpSector {
    Government = "government",
    Private = "private",
}


export function toCorpIndustry(value: string): CorpIndustry | undefined {
    return Object.values(CorpIndustry).includes(value as CorpIndustry) ? (value as CorpIndustry) : undefined;
}

export function toCorpSector(value: string): CorpSector | undefined {
    return Object.values(CorpSector).includes(value as CorpSector) ? (value as CorpSector) : undefined;
}


export interface CorpListData {
    id: number;
    displayName: string;
    badge: string;
    industry: CorpIndustry;
    sector: CorpSector;
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
            this._corps.push({ id: Number(id), displayName, badge, industry: toCorpIndustry(industry), sector: toCorpSector(sector), userId: Number(userId), userName, employeeCount: Number(employeeCount) })
        }

        return true;
    }

    public get corps(): CorpListData[] {
        return this._corps;
    }

}

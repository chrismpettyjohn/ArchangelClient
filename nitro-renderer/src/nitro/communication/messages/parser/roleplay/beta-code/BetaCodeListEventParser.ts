import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BetaCodeListRow {
    id: number;
    code: string;
    claimedByUserId?: number;
    claimedByUsername?: string;
    claimedAt?: number;
    createdAt: number;
}

export class BetaCodeListEventParser implements IMessageParser {
    private _betaCodes: Array<BetaCodeListRow> = [];

    public flush(): boolean {
        this._betaCodes = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalBetaCodes = wrapper.readInt();

        for (let i = 0; i < totalBetaCodes; i++) {
            const [id, code, claimedByUserId, claimedByUsername, claimedAt, createdAt] = wrapper.readString().split(';');
            this._betaCodes.push({
                id: Number(id),
                code,
                claimedByUserId: claimedByUserId ? Number(claimedByUserId) : undefined,
                claimedByUsername,
                claimedAt: claimedAt ? Number(claimedAt) : undefined,
                createdAt: Number(createdAt),
            });
        }

        return true;
    }

    public get betaCodes(): Array<BetaCodeListRow> {
        return this._betaCodes;
    }

}

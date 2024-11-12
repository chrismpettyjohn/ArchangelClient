import { IMessageComposer } from "../../../../../../api";
import { CorpIndustry, CorpSector } from "../../../parser";

export class CorpCreateComposer implements IMessageComposer<ConstructorParameters<typeof CorpCreateComposer>> {
    private _data: ConstructorParameters<typeof CorpCreateComposer>;

    constructor(displayName: string, description: string, badgeCode: string, roomId: number, userId: number, sector: CorpSector, industry: CorpIndustry) {
        this._data = [displayName, description, badgeCode, roomId, userId, sector, industry];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
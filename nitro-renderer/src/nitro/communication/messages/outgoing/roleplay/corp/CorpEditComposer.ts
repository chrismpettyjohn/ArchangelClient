import { IMessageComposer } from "../../../../../../api";
import { CorpIndustry, CorpSector } from "../../../parser";

export class CorpEditComposer implements IMessageComposer<ConstructorParameters<typeof CorpEditComposer>> {
    private _data: ConstructorParameters<typeof CorpEditComposer>;

    constructor(corpId: number, displayName: string, description: string, userId: number, roomId: number, sector: CorpSector, industry: CorpIndustry) {
        this._data = [corpId, displayName, description, userId, roomId, sector, industry];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
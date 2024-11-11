import { IMessageComposer } from "../../../../../../api";

export class PlayerQueryListComposer implements IMessageComposer<ConstructorParameters<typeof PlayerQueryListComposer>> {
    private _data: ConstructorParameters<typeof PlayerQueryListComposer>;

    constructor(page: number, query: string) {
        this._data = [page, query];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
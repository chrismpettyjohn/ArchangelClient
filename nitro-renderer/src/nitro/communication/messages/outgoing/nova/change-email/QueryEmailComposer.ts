import { IMessageComposer } from '../../../../../../api';

export class QueryEmailComposer implements IMessageComposer<ConstructorParameters<typeof QueryEmailComposer>> {
    private _data: ConstructorParameters<typeof QueryEmailComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

import { IMessageComposer } from '../../../../../api';

export class UserGuestbookUpdateComposer implements IMessageComposer<ConstructorParameters<typeof UserGuestbookUpdateComposer>> {
    private _data: ConstructorParameters<typeof UserGuestbookUpdateComposer>;

    constructor(postId: number, message: string) {
        this._data = [postId, message];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

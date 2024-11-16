import { IMessageComposer } from '../../../../../api';

export class UserGuestbookQueryOneComposer implements IMessageComposer<ConstructorParameters<typeof UserGuestbookQueryOneComposer>> {
    private _data: ConstructorParameters<typeof UserGuestbookQueryOneComposer>;

    constructor(postId: number) {
        this._data = [postId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

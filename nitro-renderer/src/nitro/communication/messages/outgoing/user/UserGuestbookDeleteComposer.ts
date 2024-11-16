import { IMessageComposer } from '../../../../../api';

export class UserGuestbookDeleteComposer implements IMessageComposer<ConstructorParameters<typeof UserGuestbookDeleteComposer>> {
    private _data: ConstructorParameters<typeof UserGuestbookDeleteComposer>;

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

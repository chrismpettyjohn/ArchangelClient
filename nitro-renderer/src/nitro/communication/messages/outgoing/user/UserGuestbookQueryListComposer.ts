import { IMessageComposer } from '../../../../../api';

export class UserGuestbookQueryListComposer implements IMessageComposer<ConstructorParameters<typeof UserGuestbookQueryListComposer>> {
    private _data: ConstructorParameters<typeof UserGuestbookQueryListComposer>;

    constructor(userId: number) {
        this._data = [userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

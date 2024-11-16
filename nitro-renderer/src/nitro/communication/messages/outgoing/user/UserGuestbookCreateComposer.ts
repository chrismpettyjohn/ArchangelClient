import { IMessageComposer } from '../../../../../api';

export class UserGuestbookCreateComposer implements IMessageComposer<ConstructorParameters<typeof UserGuestbookCreateComposer>> {
    private _data: ConstructorParameters<typeof UserGuestbookCreateComposer>;

    constructor(postedOnUsersId: number, message: string) {
        this._data = [postedOnUsersId, message];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

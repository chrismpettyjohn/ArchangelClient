import { IMessageComposer } from '../../../../../../api';

export class ChangeEmailComposer implements IMessageComposer<ConstructorParameters<typeof ChangeEmailComposer>> {
    private _data: ConstructorParameters<typeof ChangeEmailComposer>;

    constructor(currentPassword: string, newEmail: string) {
        this._data = [currentPassword, newEmail];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

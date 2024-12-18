import { IMessageComposer } from '../../../../../../api';

export class ChangePasswordComposer implements IMessageComposer<ConstructorParameters<typeof ChangePasswordComposer>> {
    private _data: ConstructorParameters<typeof ChangePasswordComposer>;

    constructor(currentPassword: string, newPassword: string, newPasswordAgain: string) {
        this._data = [currentPassword, newPassword, newPasswordAgain];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

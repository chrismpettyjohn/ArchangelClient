import { IMessageComposer } from '../../../../../../api';

export class UserChangeProfileBannerComposer implements IMessageComposer<ConstructorParameters<typeof UserChangeProfileBannerComposer>> {
    private _data: ConstructorParameters<typeof UserChangeProfileBannerComposer>;

    constructor(imageUrl: string) {
        this._data = [imageUrl];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}

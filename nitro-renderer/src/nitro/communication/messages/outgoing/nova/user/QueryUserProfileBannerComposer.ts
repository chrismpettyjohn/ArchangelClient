import { IMessageComposer } from '../../../../../../api';

export class QueryUserProfileBannerComposer implements IMessageComposer<ConstructorParameters<typeof QueryUserProfileBannerComposer>> {
    private _data: ConstructorParameters<typeof QueryUserProfileBannerComposer>;

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

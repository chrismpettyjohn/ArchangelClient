import { IMessageComposer } from "../../../../../../api";

export class PlayerQuerySkillsListComposer implements IMessageComposer<ConstructorParameters<typeof PlayerQuerySkillsListComposer>> {
    private _data: ConstructorParameters<typeof PlayerQuerySkillsListComposer>;

    constructor(userID: number) {
        this._data = [userID];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
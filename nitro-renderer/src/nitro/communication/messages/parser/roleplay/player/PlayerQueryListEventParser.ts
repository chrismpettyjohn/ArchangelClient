import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface PlayerListData {
    id: number;
    username: string;
    look: string;
    corpID: number;
    corpName: string;
    corpRoleID: number;
    corpRoleName: string;
    gangID: number;
    gangRoleID: number;
}

export class PlayerQueryListEventParser implements IMessageParser {
    private _players: Array<PlayerListData> = [];

    public flush(): boolean {
        this._players = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalPlayers = wrapper.readInt();

        for (let i = 0; i < totalPlayers; i++) {
            const [id, username, look, corpID, corpName, corpRoleID, corpRoleName, gangID, gangRoleID] = wrapper.readString().split(';');
            this._players.push({
                id: Number(id),
                username,
                look,
                corpID: Number(corpID),
                corpName,
                corpRoleID: Number(corpRoleID),
                corpRoleName,
                gangID: Number(gangID),
                gangRoleID: Number(gangRoleID),
            });
        }

        return true;
    }

    public get players(): Array<PlayerListData> {
        return this._players;
    }

}

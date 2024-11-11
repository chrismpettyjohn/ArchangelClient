import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { PlayerQuerySkillsListEventParser } from "../../../parser";

export class PlayerQuerySkillsListEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, PlayerQuerySkillsListEventParser);
    }

    public getParser(): PlayerQuerySkillsListEventParser {
        return this.parser as PlayerQuerySkillsListEventParser;
    }
}

import { IMessageEvent } from "../../../../../../api";
import { MessageEvent } from "../../../../../../events";
import { WeaponVendingMachineDataEventParser } from "../../../parser";

export class WeaponVendingMachineDataEvent extends MessageEvent implements IMessageEvent {
    constructor(callBack: Function) {
        super(callBack, WeaponVendingMachineDataEventParser);
    }

    public getParser(): WeaponVendingMachineDataEventParser {
        return this.parser as WeaponVendingMachineDataEventParser;
    }
}

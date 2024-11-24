import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface TaxiInformation {
    fee: number;
    delay: number;
}

export class TaxiStandEventParser implements IMessageParser {
    private _taxiFee: number;
    private _taxiDelay: number;

    public flush(): boolean {
        this._taxiFee = 0;
        this._taxiDelay = 0;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._taxiFee = wrapper.readInt();
        this._taxiDelay = wrapper.readInt();

        return true;
    }

    public get taxiInfo(): TaxiInformation {
        return {
            fee: this._taxiFee,
            delay: this._taxiDelay,
        }
    }
}

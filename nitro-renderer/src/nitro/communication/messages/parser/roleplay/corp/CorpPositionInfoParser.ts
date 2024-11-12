import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface CorpPositionInfoData {
    id: number;
    corpID: number;
    displayName: string;
    description: string;
    motto: string;
    salary: number;
    orderID: number;
    maleUniform: string;
    femaleUniform: string;
    canHire: boolean;
    canFire: boolean;
    canPromote: boolean;
    canDemote: boolean;
    canWorkAnywhere: boolean;
}

export class CorpPositionInfoParser implements IMessageParser {
    private _id: number;
    private _corpID: number;
    private _name: string;
    private _description: string;
    private _motto: string;
    private _salary: number;
    private _orderID: number;
    private _maleUniform: string;
    private _femaleUniform: string;
    private _canHire: boolean;
    private _canFire: boolean;
    private _canPromote: boolean;
    private _canDemote: boolean;
    private _canWorkAnywhere: boolean;

    public flush(): boolean {
        this._id = 0;
        this._corpID = 0;
        this._name = '';
        this._description = '';
        this._motto = '';
        this._orderID = 0;
        this._canHire = false;
        this._canFire = false;
        this._canPromote = false;
        this._canDemote = false;
        this._canWorkAnywhere = false;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            this._id = wrapper.readInt();
            this._corpID = wrapper.readInt();
            this._name = wrapper.readString();
            this._description = wrapper.readString();
            this._motto = wrapper.readString();
            this._salary = wrapper.readInt();
            this._orderID = wrapper.readInt();
            this._maleUniform = wrapper.readString();
            this._femaleUniform = wrapper.readString();
            this._canHire = wrapper.readBoolean();
            this._canFire = wrapper.readBoolean();
            this._canPromote = wrapper.readBoolean();
            this._canDemote = wrapper.readBoolean();
            this._canWorkAnywhere = wrapper.readBoolean();
        } catch (e: any) {
            console.log(e);
            throw e;
        }

        return true;
    }

    public get data(): CorpPositionInfoData {
        return {
            id: this._id,
            corpID: this._corpID,
            displayName: this._name,
            description: this._description,
            motto: this._motto,
            salary: this._salary,
            orderID: this._orderID,
            maleUniform: this._maleUniform,
            femaleUniform: this._femaleUniform,
            canHire: this._canHire,
            canFire: this._canFire,
            canPromote: this._canPromote,
            canDemote: this._canDemote,
            canWorkAnywhere: this._canWorkAnywhere,
        }
    }
}
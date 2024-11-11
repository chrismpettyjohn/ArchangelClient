import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { CorpIndustry, CorpSector, toCorpIndustry, toCorpSector } from "./CorpListEventParser";

export interface CorpInfoData {
    id: number;
    userID: number;
    userName: string;
    userLook: string;
    roomID: number;
    name: string;
    description: string;
    badgeCode: string;
    employeeCount: number;
    industry: CorpIndustry;
    sector: CorpSector;
}


export class CorpInfoParser implements IMessageParser {
    private _id: number;
    private _userID: number;
    private _userName: string;
    private _userLook: string;
    private _roomID: number;
    private _name: string;
    private _description: string;
    private _badgeCode: string;
    private _employeeCount: number;
    private _industry: CorpIndustry;
    private _sector: CorpSector;

    public flush(): boolean {
        this._id = 0;
        this._userID = 0;
        this._userName = '';
        this._userLook = '';
        this._roomID = 0;
        this._name = '';
        this._description = '';
        this._badgeCode = '';
        this._employeeCount = 0;
        this._industry = CorpIndustry.PublicAid;
        this._sector = CorpSector.Government;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        this._id = wrapper.readInt();
        this._userID = wrapper.readInt();
        this._roomID = wrapper.readInt();
        this._name = wrapper.readString();
        this._description = wrapper.readString();
        this._badgeCode = wrapper.readString();
        this._employeeCount = wrapper.readInt();
        this._industry = toCorpIndustry(wrapper.readString());
        this._sector = toCorpSector(wrapper.readString());

        return true;
    }

    public get data(): CorpInfoData {
        return {
            id: this._id,
            userID: this._userID,
            userName: this._userName,
            userLook: this._userLook,
            roomID: this._roomID,
            name: this._name,
            description: this._description,
            badgeCode: this._badgeCode,
            employeeCount: this._employeeCount,
            industry: this._industry,
            sector: this._sector,
        }
    }
}

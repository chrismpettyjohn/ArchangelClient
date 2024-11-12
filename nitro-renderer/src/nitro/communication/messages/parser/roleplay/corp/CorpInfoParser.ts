import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { CorpIndustry, CorpSector, toCorpIndustry, toCorpSector } from "./CorpListEventParser";

export interface CorpInfoData {
    id: number;
    userID: number;
    userName: string;
    userLook: string;
    roomID: number;
    roomName: string;
    displayName: string;
    description: string;
    badgeCode: string;
    employeeCount: number;
    industry: CorpIndustry;
    sector: CorpSector;
    createdAt: string;
}


export class CorpInfoParser implements IMessageParser {
    private _id: number;
    private _userID: number;
    private _userName: string;
    private _userLook: string;
    private _roomID: number;
    private _roomName: string;
    private _displayName: string;
    private _description: string;
    private _badgeCode: string;
    private _employeeCount: number;
    private _industry: CorpIndustry;
    private _sector: CorpSector;
    private _createdAt: string;

    public flush(): boolean {
        this._id = -1;
        this._userID = -1;
        this._userName = '';
        this._userLook = '';
        this._roomID = -1;
        this._roomName = '';
        this._displayName = '';
        this._description = '';
        this._badgeCode = '';
        this._employeeCount = -1;
        this._industry = CorpIndustry.PublicAid;
        this._sector = CorpSector.Government;
        this._createdAt = '';
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        try {
            this._id = wrapper.readInt();
            this._userID = wrapper.readInt();
            this._userName = wrapper.readString();
            this._userLook = wrapper.readString();
            this._roomID = wrapper.readInt();
            this._roomName = wrapper.readString();
            this._displayName = wrapper.readString();
            this._description = wrapper.readString();
            this._badgeCode = wrapper.readString();
            this._employeeCount = wrapper.readInt();
            this._industry = toCorpIndustry(wrapper.readString());
            this._sector = toCorpSector(wrapper.readString());
            this._createdAt = wrapper.readString();
        } catch (e: any) {
            console.log({ e });
            throw e;
        }

        return true;
    }

    public get data(): CorpInfoData {
        return {
            id: this._id,
            userID: this._userID,
            userName: this._userName,
            userLook: this._userLook,
            roomID: this._roomID,
            roomName: this._roomName,
            displayName: this._displayName,
            description: this._description,
            badgeCode: this._badgeCode,
            employeeCount: this._employeeCount,
            industry: this._industry,
            sector: this._sector,
            createdAt: this._createdAt,
        }
    }
}

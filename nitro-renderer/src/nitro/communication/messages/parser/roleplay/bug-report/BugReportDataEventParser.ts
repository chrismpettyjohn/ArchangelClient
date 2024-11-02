import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BugReportData {
    id: number;
    displayName: string;
    content: string;
    createdByUserId: number;
    createdAt: number;
    closedByUserId?: number;
    closedAt?: number;
}

export class BugReportDataEventParser implements IMessageParser {
    private _id: number;
    private _displayName: string;
    private _content: string;
    private _createdByUserId: number;
    private _createdAt: number;
    private _closedByUserId?: number;
    private _closedAt?: number;

    public flush(): boolean {
        this._id = -1;
        this._displayName = '';
        this._content = '';
        this._createdByUserId = -1;
        this._createdAt = -1;
        this._closedByUserId = undefined;
        this._closedAt = undefined;
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const [id, displayName, content, createdByUserId, createdAt, closedByUserId, closedAt] = [
            wrapper.readInt(),
            wrapper.readString(),
            wrapper.readString(),
            wrapper.readInt(),
            wrapper.readInt(),
            wrapper.readInt(),
            wrapper.readInt()
        ]

        this._id = id;
        this._displayName = displayName;
        this._content = content;
        this._createdByUserId = createdByUserId
        this._createdAt = createdAt
        this._closedByUserId = closedByUserId || undefined
        this._closedAt = closedAt || undefined

        return true;
    }

    public get bugReport(): BugReportData {
        return {
            id: this._id,
            displayName: this._displayName,
            content: this._content,
            createdByUserId: this._createdByUserId,
            createdAt: this._createdAt,
            closedByUserId: this._closedByUserId ? this._closedByUserId : undefined,
            closedAt: this._closedAt ? this._closedAt : undefined,
        };
    }

}

import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface BugReportListRow {
    id: number;
    displayName: string;
    createdByUserId: number;
    createdAt: number;
    closedAt?: number;
    closedByUserId?: number;
}

export class BugReportListEventParser implements IMessageParser {
    private _bugReports: Array<BugReportListRow> = [];

    public flush(): boolean {
        this._bugReports = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const totalBugReports = wrapper.readInt();

        for (let i = 0; i < totalBugReports; i++) {
            const [id, displayName, createdByUserId, createdAt, closedAt, closedByUserId] = wrapper.readString().split(';');
            this._bugReports.push({
                id: Number(id),
                displayName,
                createdByUserId: Number(createdByUserId),
                createdAt: Number(closedAt) || undefined,
                closedAt: Number(closedAt) || undefined,
                closedByUserId: Number(closedByUserId) || undefined,
            });
        }

        return true;
    }

    public get bugReports(): Array<BugReportListRow> {
        return this._bugReports;
    }

}

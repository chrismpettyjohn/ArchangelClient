import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface TurfCaptureTimeLeftData {
    finishesAt: number;
    isCapturing: boolean;
    capturingUserId: number;
    capturingGangId: number;
    gangs: Array<{ gangId: number; userCount: number; }>
}

export class TurfCaptureTimeLeftEventParser implements IMessageParser {
    private _finishesAt: number;
    private _isCapturing: boolean;
    private _capturingUserId: number;
    private _capturingGangId: number;
    private _gangs: Array<{ gangId: number; userCount: number; }>;

    public flush(): boolean {
        this._finishesAt = -1;
        this._isCapturing = false;
        this._capturingUserId = -1;
        this._capturingGangId = -1;
        this._gangs = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        try {
            if (!wrapper) return false;
            this._finishesAt = Number(wrapper.readString());
            this._isCapturing = wrapper.readBoolean();
            this._capturingUserId = wrapper.readInt();
            this._capturingGangId = wrapper.readInt();

            const gangs: Array<{ gangId: number; userCount: number; }> = [];
            const gangCount = wrapper.readInt();

            for (let i = 0; i < gangCount; i++) {
                const [gangId, userCount] = wrapper.readString().split(';').map(Number);
                gangs.push({ gangId, userCount });
            }

            this._gangs = gangs;

            return true;
        } catch (e: any) {
            console.log({ error: e });
            console.log(e);
            throw e;
        }
    }

    public get data(): TurfCaptureTimeLeftData {
        return {
            finishesAt: this._finishesAt,
            isCapturing: this._isCapturing,
            capturingUserId: this._capturingUserId,
            capturingGangId: this._capturingGangId,
            gangs: this._gangs,
        }
    }
}

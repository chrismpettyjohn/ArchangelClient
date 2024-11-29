import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";
import { CrimeData } from "./CrimeDataEventParser";

export class CrimeListEventParser implements IMessageParser {
    private _crimes: CrimeData[] = [];

    public flush(): boolean {
        this._crimes = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean {
        if (!wrapper) return false;

        const crimeCount = wrapper.readInt();

        for (let i = 0; i < crimeCount; i++) {
            const [id, displayName, description, jailTime] = wrapper.readString().split(';');
            this._crimes.push({
                id: Number(id),
                displayName,
                description,
                jailTime: Number(jailTime),
            })
        }

        return true;
    }

    public get crimes(): CrimeData[] {
        return this._crimes;
    }
}

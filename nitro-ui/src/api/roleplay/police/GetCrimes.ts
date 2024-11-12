import { GetConfiguration } from "../../nitro";

export interface Crime {
    id: number;
    crime: string;
    sentence: number;
}

export function useCrimes(): Crime[] {
    return GetConfiguration<Crime[]>('roleplay.crimes').map((_, i) => ({
        ..._,
        id: i + 1,
    }))
}
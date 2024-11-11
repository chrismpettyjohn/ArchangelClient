import { CorpIndustry, CorpInfoData, CorpSector } from "@nitro-rp/renderer"
import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../common";
import Select from 'react-select';

const CORP_INDUSTRY_OPTIONS: Array<{ key: string; value: CorpIndustry }> = Object.values(CorpIndustry).map(_ => ({ key: _, value: _ }))
const CORP_SECTOR_OPTIONS: Array<{ key: string; value: CorpSector }> = Object.values(CorpSector).map(_ => ({ key: _, value: _ }))

export interface CorpDTO {
    displayName: string;
    description: string;
    roomID: number;
    userID: number;
    industry: CorpIndustry;
    sector: CorpSector;
}

export interface CorpEditorProps {
    defaultCorp?: CorpInfoData;
    onSave(dto: CorpDTO): void;
}

export function CorpEditor({ defaultCorp, onSave }: CorpEditorProps) {
    const [dto, setDTO] = useState<CorpDTO>({
        displayName: defaultCorp?.displayName ?? '',
        description: defaultCorp?.description ?? '',
        roomID: defaultCorp?.roomID ?? -1,
        userID: defaultCorp?.userID ?? -1,
        industry: defaultCorp?.industry ?? CorpIndustry.Retail,
        sector: defaultCorp?.sector ?? CorpSector.Private,
    });

    const onChanges = useCallback((changes: Partial<CorpDTO>) => {
        setDTO(_ => ({ ..._, ...changes }))
    }, [setDTO]);
    const onSaveChanges = useCallback(() => onSave(dto), [dto, onSave]);

    return (
        <form onSubmit={onSaveChanges} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 14 }}>
            <div>
                <Text fontSize={5} variant="white">Display Name</Text>
                <input className="form-control" placeholder="display name" value={dto.displayName} onChange={e => onChanges({ displayName: e.target.value ?? '' })} />
            </div>
            <div>
                <Text fontSize={5} variant="white">Description</Text>
                <input className="form-control" placeholder="display name" value={dto.displayName} onChange={e => onChanges({ displayName: e.target.value ?? '' })} />
            </div>
            <div>
                <Text fontSize={5} variant="white">CEO</Text>
                <Select options={CORP_INDUSTRY_OPTIONS as any} value={dto.industry} onChange={(o: any) => onChanges({ industry: o.value })} />
            </div>
            <div>
                <Text fontSize={5} variant="white">Headquarters</Text>
                <Select options={CORP_INDUSTRY_OPTIONS as any} value={dto.industry} onChange={(o: any) => onChanges({ industry: o.value })} />
            </div>
            <div>
                <Text fontSize={5} variant="white">Industry</Text>
                <Select options={CORP_INDUSTRY_OPTIONS as any} value={dto.industry} onChange={(o: any) => onChanges({ industry: o.value })} />
            </div>
            <div>
                <Text fontSize={5} variant="white">Sector</Text>
                <Select options={CORP_SECTOR_OPTIONS as any} value={dto.sector} onChange={(o: any) => onChanges({ sector: o.value })} />
            </div>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                <div>
                    <Button variant="success" size="sm">
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    )
}
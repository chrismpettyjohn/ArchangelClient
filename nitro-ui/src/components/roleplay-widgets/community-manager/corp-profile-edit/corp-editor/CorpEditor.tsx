import { CorpIndustry, CorpInfoData, CorpSector } from "@nitro-rp/renderer"
import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../common";
import Select from 'react-select';
import { CorpIndustrySelect } from "../../../../roleplay/CorpIndustrySelect";
import { CorpSectorSelect } from "../../../../roleplay/CorpSectorSelect";
import { RoomSelect } from "../../../../roleplay/RoomSelect";
import { UserSelect } from "../../../../roleplay/UserSelect";

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
                <textarea className="form-control" placeholder="display name" value={dto.displayName} onChange={e => onChanges({ displayName: e.target.value ?? '' })} rows={6} />
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
                <div className="w-100">
                    <Text fontSize={5} variant="white">CEO</Text>
                    <UserSelect userID={dto.userID} onChange={user => onChanges({ userID: user.id })} />
                </div>
                <div className="w-100">
                    <Text fontSize={5} variant="white">Headquarters</Text>
                    <RoomSelect roomID={dto.roomID} onChange={roomID => onChanges({ roomID })} />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
                <div className="w-100">
                    <Text fontSize={5} variant="white">Industry</Text>
                    <CorpIndustrySelect industry={dto.industry} onChange={industry => onChanges({ industry })} />
                </div>
                <div className="w-100">
                    <Text fontSize={5} variant="white">Sector</Text>
                    <CorpSectorSelect sector={dto.sector} onChange={sector => onChanges({ sector })} />
                </div>
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
import { CorpPositionInfoData } from "@nitro-rp/renderer"
import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../common";
import Select from 'react-select';

export interface CorpPositionDTO {
    orderID: number;
    displayName: string;
    description: string;
    salary: number;
    maleFigure: string;
    femaleFigure: string;
    canPromote: boolean;
    canDemote: boolean;
    canHire: boolean;
    canFire: boolean;

}

export interface CorpPositionEditorProps {
    defaultCorpPosition?: CorpPositionInfoData;
    onSave(dto: CorpPositionDTO): void;
}

export function CorpPositionEditor({ defaultCorpPosition, onSave }: CorpPositionEditorProps) {
    const [dto, setDTO] = useState<CorpPositionDTO>({
        orderID: defaultCorpPosition?.orderID ?? -1,
        displayName: defaultCorpPosition?.displayName ?? '',
        description: defaultCorpPosition?.description ?? '',
        salary: defaultCorpPosition?.salary ?? -1,
        maleFigure: defaultCorpPosition?.maleUniform ?? '',
        femaleFigure: defaultCorpPosition?.femaleUniform ?? '',
        canHire: defaultCorpPosition?.canHire ?? false,
        canFire: defaultCorpPosition?.canFire ?? false,
        canPromote: defaultCorpPosition?.canPromote ?? false,
        canDemote: defaultCorpPosition?.canDemote ?? false,
    });

    const onChanges = useCallback((changes: Partial<CorpPositionDTO>) => {
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
                <Text fontSize={5} variant="white">Salary</Text>
                <input className="form-control" placeholder="20" type="number" value={dto.salary} onChange={e => onChanges({ salary: Number(e.target.value) ?? 0 })} />
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
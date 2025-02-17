import { CorpDeletePositionComposer, CorpPositionInfoData } from "@nitro-rp/renderer"
import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../../common";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../../api";

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
    canWorkAnywhere: boolean;

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
        canWorkAnywhere: defaultCorpPosition?.canWorkAnywhere ?? false,
    });

    const onChanges = useCallback((changes: Partial<CorpPositionDTO>) => {
        setDTO(_ => ({ ..._, ...changes }))
    }, [setDTO]);

    const onDeletePosition = useCallback(() => {
        if (!defaultCorpPosition) return;
        SendMessageComposer(new CorpDeletePositionComposer(defaultCorpPosition.id))
        CreateLinkEvent(`community/corps/profile-edit/${defaultCorpPosition.corpID}`);
    }, [defaultCorpPosition]);

    const onToggle = useCallback((key: keyof CorpPositionDTO) => {
        setDTO(_ => ({ ..._, [key]: !_[key] }))
    }, [setDTO]);

    const onSaveChanges = useCallback(() => onSave(dto), [dto, onSave]);

    return (
        <form onSubmit={onSaveChanges} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
                <Text fontSize={4} variant="white">Display Name</Text>
                <input className="form-control" placeholder="display name" value={dto.displayName} onChange={e => onChanges({ displayName: e.target.value ?? '' })} />
            </div>
            <div>
                <Text fontSize={4} variant="white">Description</Text>
                <textarea className="form-control" placeholder="description" value={dto.description} onChange={e => onChanges({ description: e.target.value ?? '' })} rows={5} />
            </div>
            <div>
                <Text fontSize={4} variant="white">Salary</Text>
                <input className="form-control" placeholder="20" type="number" value={dto.salary} onChange={e => onChanges({ salary: Number(e.target.value) ?? 0 })} />
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
                <div className="w-100">
                    <Text fontSize={4} variant="white">Male Uniform</Text>
                    <input className="form-control" placeholder="male uniform" type="number" value={dto.maleFigure} onChange={e => onChanges({ maleFigure: e.target.value ?? '' })} />
                </div>
                <div className="w-100">
                    <Text fontSize={4} variant="white">Female Uniform</Text>
                    <input className="form-control" placeholder="female uniform" type="number" value={dto.femaleFigure} onChange={e => onChanges({ femaleFigure: e.target.value ?? '' })} />
                </div>
            </div>
            <div>
                <Text fontSize={4} variant="white">Permissions</Text>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canHire}
                            onChange={() => onToggle('canHire')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Hire</Text>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canFire}
                            onChange={() => onToggle('canFire')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Fire</Text>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canPromote}
                            onChange={() => onToggle('canPromote')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Promote</Text>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canDemote}
                            onChange={() => onToggle('canDemote')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Demote</Text>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canWorkAnywhere}
                            onChange={() => onToggle('canWorkAnywhere')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Work Anywhere</Text>
                    </label>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div>
                    {
                        defaultCorpPosition && (
                            <Button variant="danger" size="sm" onClick={onDeletePosition}>
                                <FaTrashAlt style={{ marginRight: 8 }} />
                                Delete
                            </Button>
                        )
                    }
                </div>
                <div>
                    <Button variant="success" size="sm" onClick={onSaveChanges}>
                        <FaPencilAlt style={{ marginRight: 8 }} />
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>

    )
}
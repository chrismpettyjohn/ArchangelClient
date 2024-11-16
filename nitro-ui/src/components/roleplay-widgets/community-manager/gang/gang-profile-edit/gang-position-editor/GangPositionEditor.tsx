import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../../common";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GangRoleData, GangRoleDeleteComposer } from "@nitro-rp/renderer";
import { CreateLinkEvent, SendMessageComposer } from "../../../../../../api";

export interface GangPositionDTO {
    displayName: string;
    canInvite: boolean;
    canKick: boolean;
}

export interface GangPositionEditorProps {
    defaultGangPosition?: GangRoleData;
    onSave(dto: GangPositionDTO): void;
}

export function GangPositionEditor({ defaultGangPosition, onSave }: GangPositionEditorProps) {
    const [dto, setDTO] = useState<GangPositionDTO>({
        displayName: defaultGangPosition?.displayName ?? '',
        canInvite: defaultGangPosition?.canInvite ?? false,
        canKick: defaultGangPosition?.canKick ?? false,
    });

    const onChanges = useCallback((changes: Partial<GangPositionDTO>) => {
        setDTO(_ => ({ ..._, ...changes }))
    }, [setDTO]);

    const onDeleteGangPosition = useCallback(() => {
        SendMessageComposer(new GangRoleDeleteComposer(defaultGangPosition.id));
        CreateLinkEvent(`community/gangs/profile-edit/${defaultGangPosition.gangId}`)
    }, [defaultGangPosition]);

    const onToggle = useCallback((key: keyof GangPositionDTO) => {
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
                <Text fontSize={4} variant="white">Permissions</Text>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canInvite}
                            onChange={() => onToggle('canInvite')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Invite</Text>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={dto.canKick}
                            onChange={() => onToggle('canKick')}
                            style={{ marginRight: 8 }}
                        />
                        <Text fontSize={5} variant="white">Can Kick</Text>
                    </label>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <div>
                    {
                        defaultGangPosition && (
                            <Button variant="danger" size="sm" onClick={onDeleteGangPosition}>
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
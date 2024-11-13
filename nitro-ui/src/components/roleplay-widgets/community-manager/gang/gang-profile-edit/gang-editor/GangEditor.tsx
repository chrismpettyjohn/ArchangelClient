import { GangInfoData } from "@nitro-rp/renderer"
import { useCallback, useState } from "react";
import { Button, Text } from "../../../../../../common";
import { RoomSelect } from "../../../../../roleplay/RoomSelect";
import { UserSelect } from "../../../../../roleplay/UserSelect";

export interface GangDTO {
    displayName: string;
    description: string;
    badgeCode: string;
    roomID: number;
    userID: number;
}

export interface GangEditorProps {
    defaultGang?: GangInfoData;
    onSave(dto: GangDTO): void;
}

export function GangEditor({ defaultGang, onSave }: GangEditorProps) {
    const [dto, setDTO] = useState<GangDTO>({
        displayName: defaultGang?.displayName ?? '',
        description: defaultGang?.description ?? '',
        badgeCode: defaultGang?.badgeCode ?? '',
        roomID: defaultGang?.roomID ?? -1,
        userID: defaultGang?.userID ?? -1,
    });

    const onChanges = useCallback((changes: Partial<GangDTO>) => {
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
                <textarea className="form-control" placeholder="display name" value={dto.description} onChange={e => onChanges({ description: e.target.value ?? '' })} rows={6} />
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
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                <div>
                    <Button variant="success" size="sm" onClick={onSaveChanges}>
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    )
}
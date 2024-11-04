import { CrimeData } from "@nitro-rp/renderer";
import { Text } from "../../../../../common";
import { SyntheticEvent, useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { FaPencilAlt } from "react-icons/fa";

export interface CrimeEditorProps {
    defaultCrime?: CrimeData;
    onSave(crime: CrimeData): void;
}

export function CrimeEditor({ defaultCrime, onSave }: CrimeEditorProps) {
    const [crime, setCrime] = useState<CrimeData>({
        id: defaultCrime?.id ?? -1,
        displayName: defaultCrime?.displayName ?? '',
        description: defaultCrime?.description ?? '',
        jailTime: Math.round(defaultCrime?.jailTime / 60) ?? 2,
    });

    const onChange = useCallback((data: Partial<CrimeData>) => {
        setCrime(_ => ({
            ..._,
            ...data,
        }));
    }, [setCrime]);

    const onSubmit = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        onSave({
            ...crime,
            jailTime: Math.round(crime.jailTime * 60)
        });
    }, [crime, onSave]);

    return (
        <>
            <form onSubmit={onSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                <div>
                    <Text bold fontSize={5} variant="white">Display Name</Text>
                    <input className="form-control form-control-sm" placeholder="Murder" type="text" name="displayName" value={crime.displayName} onChange={e => onChange({ displayName: e.currentTarget.value })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Description</Text>
                    <textarea className="form-control form-control-sm" placeholder="Killing another civilian in a non self-defense scenario" rows={10} name="description" value={crime.description} onChange={e => onChange({ description: e.currentTarget.value })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Jail time minutes</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" name="jailTime" value={crime.jailTime} onChange={e => onChange({ jailTime: Number(e.currentTarget.value) })} />
                </div>
            </form>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="primary" onClick={onSubmit}>
                    <FaPencilAlt style={{ marginRight: 4 }} />
                    Save
                </Button>
            </div>
        </>
    )
}
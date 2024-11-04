import { CrimeData } from "@nitro-rp/renderer";
import { Grid, Text } from "../../../../../common";
import { ChangeEvent, SyntheticEvent, useCallback, useState } from "react";
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
        jailTime: defaultCrime?.jailTime ?? 60,
    });

    const onChange = useCallback((data: Partial<CrimeData>) => {
        setCrime(_ => ({
            ..._,
            ...data,
        }));
    }, [setCrime]);

    const onSubmit = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        onSave(crime);
    }, [crime, onSave]);

    return (
        <>
            <form onSubmit={onSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
                <div>
                    <Text bold fontSize={5} variant="white">Display Name</Text>
                    <input className="form-control form-control-sm" placeholder="hk-mp5" type="text" name="displayName" value={crime.displayName} onChange={e => onChange({ displayName: e.currentTarget.value })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Description</Text>
                    <textarea className="form-control form-control-sm" placeholder="HK MP5" rows={10} name="description" value={crime.description} onChange={e => onChange({ description: e.currentTarget.value })} />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Jail Time seconds</Text>
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
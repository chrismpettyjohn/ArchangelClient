import { CorpData } from "@nitro-rp/renderer";
import { Grid, Text } from "../../../../../common";

export interface CorpEditorProps {
    defaultCorp?: CorpData;
}

export function CorpEditor({ defaultCorp }: CorpEditorProps) {
    return (
        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
            <div>
                <Text bold fontSize={5} variant="white">Identifier</Text>
                <input className="form-control form-control-sm" placeholder="hk-mp5" type="text" />
            </div>
            <div>
                <Text bold fontSize={5} variant="white">Display Name</Text>
                <input className="form-control form-control-sm" placeholder="HK MP5" type="text" />
            </div>
            <div>
                <Text bold fontSize={5} variant="white">Special Abilities</Text>
                <input className="form-control form-control-sm" placeholder="5" type="number" />
            </div>
            <Grid columnCount={2}>
                <div>
                    <Text bold fontSize={5} variant="white">Type</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Weight</Text>
                    <input className="form-control form-control-sm" placeholder="3" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Ammo Capacity</Text>
                    <input className="form-control form-control-sm" placeholder="30" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Min. Damage</Text>
                    <input className="form-control form-control-sm" placeholder="7" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Max. Damage</Text>
                    <input className="form-control form-control-sm" placeholder="15" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Range</Text>
                    <input className="form-control form-control-sm" placeholder="8" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Cooldown</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" />
                </div>
                <div>
                    <Text bold fontSize={5} variant="white">Reload Time</Text>
                    <input className="form-control form-control-sm" placeholder="5" type="number" />
                </div>
            </Grid>
            <hr />
            <div>
                <Text bold fontSize={5} variant="white">Equip Effect</Text>
                <input className="form-control form-control-sm" placeholder="5" type="number" />
            </div>
            <div>
                <Text bold fontSize={5} variant="white">Equip Message</Text>
                <input className="form-control form-control-sm" placeholder="5" type="number" />
            </div>
            <div>
                <Text bold fontSize={5} variant="white">Reload Message</Text>
                <input className="form-control form-control-sm" placeholder="5" type="number" />
            </div>
            <div>
                <Text bold fontSize={5} variant="white">Holster Message</Text>
                <input className="form-control form-control-sm" placeholder="5" type="number" />
            </div>
        </form>
    )
}
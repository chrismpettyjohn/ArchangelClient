import { FaCaretRight, FaPlusSquare } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { useCorpList } from "../../../../hooks/roleplay/use-corp-list";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";
import { Button } from "../../../../common";
import { useRoleplayPermissions } from "../../../../hooks/roleplay/use-roleplay-permissions";

export function CorpList() {
    const corps = useCorpList()
    const [search, setSearch] = useState('');
    const { active, onHide } = useCommunityLinkTracker('corps', 'list');
    const permissions = useRoleplayPermissions();

    const filteredCorps = useMemo(() => {
        return corps.filter(_ => _.displayName.toLowerCase().includes(search))
    }, [corps, search]);

    const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value ?? ''), [setSearch]);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={onHide}>
            {
                permissions.canEditAllCorps && (
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginBottom: 14 }}>
                        <Button variant="primary" onClick={() => CreateLinkEvent('community/corps/profile-create')}>
                            <FaPlusSquare style={{ marginRight: 8 }} />
                            Create
                        </Button>
                    </div>
                )
            }
            <form className="form-group w-100 mb-4">
                <input className="form-control form-control-sm" type="text" placeholder="Search by corp name..." value={search} onChange={onSearch} />
            </form>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                {filteredCorps.map((corp) => (
                    <li
                        key={`corp_${corp.id}`}
                        onClick={() => CreateLinkEvent(`community/corps/profile/${corp.id}`)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            borderBottom: "1px solid #ccc",
                            cursor: "pointer",
                        }}
                    >
                        <img
                            src="https://www.habborator.org/badges/badges/HBA.gif"
                            alt={`${corp.displayName} badge`}
                            style={{
                                width: "45px",
                                height: "45px",
                                marginRight: "10px",
                            }}
                        />
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ fontWeight: "bold" }}>{corp.displayName}</div>
                            <div>Employees: {corp.employeeCount}</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                            <FaCaretRight />
                        </div>
                    </li>
                ))}
            </ul>
            {
                !filteredCorps.length && (
                    <p>No corps found</p>
                )
            }
        </CommunityLayout>
    );
}

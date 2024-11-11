import { FaCaretRight } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";

export function GangList() {
    const gangs = [];
    const [search, setSearch] = useState('');
    const { active, onHide } = useCommunityLinkTracker('gangs', 'list');

    const filteredGangs = useMemo(() => {
        return gangs.filter(_ => _.displayName.toLowerCase().includes(search))
    }, [gangs, search]);

    const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value ?? ''), [setSearch]);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="gangs" onClose={onHide}>
            <form className="form-group w-100 mb-4">
                <input className="form-control form-control-sm" type="text" placeholder="Search by gang name..." value={search} onChange={onSearch} />
            </form>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                {filteredGangs.map((gang) => (
                    <li
                        key={`gang_${gang.id}`}
                        onClick={() => CreateLinkEvent(`community/gangs/profile/${gang.id}`)}
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
                            alt={`${gang.displayName} badge`}
                            style={{
                                width: "45px",
                                height: "45px",
                                marginRight: "10px",
                            }}
                        />
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ fontWeight: "bold" }}>{gang.displayName}</div>
                            <div>Employees: {gang.employeeCount}</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                            <FaCaretRight />
                        </div>
                    </li>
                ))}
            </ul>
            {
                !filteredGangs.length && (
                    <p>No gangs found</p>
                )
            }
        </CommunityLayout>
    );
}

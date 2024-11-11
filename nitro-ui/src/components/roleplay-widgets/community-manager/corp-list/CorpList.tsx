import { FaCaretRight } from "react-icons/fa";
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker } from "../../../../api";
import { useCorpList } from "../../../../hooks/roleplay/use-corp-list";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ILinkEventTracker } from "@nitro-rp/renderer";
import { CommunityLayout } from "../CommunityLayout";

export function CorpList() {
    const corps = useCorpList()
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);

    const filteredCorps = useMemo(() => {
        return corps.filter(_ => _.displayName.toLowerCase().includes(search))
    }, [corps, search]);

    const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value ?? ''), [setSearch]);

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const parts = url.split('/');
                if (parts.length < 2) {
                    return;
                }
                const action = parts[1];
                setVisible(action === 'list');
            },
            eventUrlPrefix: 'corps'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, []);

    if (!visible) {
        return null;
    }

    return (
        <CommunityLayout tab="corps" onClose={() => setVisible(false)}>
            <form className="form-group w-100 mb-4">
                <input className="form-control form-control-sm" type="text" placeholder="Search by corp name..." value={search} onChange={onSearch} />
            </form>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                {filteredCorps.map((corp) => (
                    <li
                        key={`corp_${corp.id}`}
                        onClick={() => CreateLinkEvent(`corps/profile/${corp.id}`)}
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

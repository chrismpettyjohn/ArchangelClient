import { FaCaretRight } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CommunityLayout, useCommunityLinkTracker } from "../CommunityLayout";

export function UserList() {
    const users = [];
    const [search, setSearch] = useState('');
    const { active, onHide } = useCommunityLinkTracker('users', 'list');

    const filteredUsers = useMemo(() => {
        return users.filter(_ => _.displayName.toLowerCase().includes(search))
    }, [users, search]);

    const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value ?? ''), [setSearch]);

    if (!active) {
        return null;
    }

    return (
        <CommunityLayout tab="users" onClose={onHide}>
            <form className="form-group w-100 mb-4">
                <input className="form-control form-control-sm" type="text" placeholder="Search by user name..." value={search} onChange={onSearch} />
            </form>
            <ul style={{ listStyleType: "none", padding: 0, margin: 0, width: '100%' }}>
                {filteredUsers.map((user) => (
                    <li
                        key={`user_${user.id}`}
                        onClick={() => CreateLinkEvent(`community/users/profile/${user.id}`)}
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
                            alt={`${user.displayName} badge`}
                            style={{
                                width: "45px",
                                height: "45px",
                                marginRight: "10px",
                            }}
                        />
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ fontWeight: "bold" }}>{user.displayName}</div>
                            <div>Employees: {user.employeeCount}</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                            <FaCaretRight />
                        </div>
                    </li>
                ))}
            </ul>
            {
                !filteredUsers.length && (
                    <p>No users found</p>
                )
            }
        </CommunityLayout>
    );
}

import { FaCaretRight } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../../api";
import { ChangeEvent, useCallback, useState } from "react";
import { CommunityLayout, useCommunityLinkTracker } from "../../CommunityLayout";
import { usePlayerList } from "../../../../../hooks/roleplay/use-player-list";
import { LayoutAvatarImageView } from "../../../../../common";

export function UserList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const players = usePlayerList(page, search);
    const { active, onHide } = useCommunityLinkTracker('users', 'list');

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
                {players.map((user) => (
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
                        <LayoutAvatarImageView figure={user.look} style={{ width: "45px", height: "45px", marginRight: "10px", }} />
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ fontWeight: "bold" }}>{user.username}</div>
                            <div>{user.corpRoleName} @ {user.corpName}</div>
                        </div>
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                            <FaCaretRight />
                        </div>
                    </li>
                ))}
            </ul>
            {
                !players.length && (
                    <p>No users found</p>
                )
            }
        </CommunityLayout>
    );
}

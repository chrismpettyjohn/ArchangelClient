import { ReactNode } from "react";
import { FaBuilding, FaIdCard, FaSkull } from "react-icons/fa";
import { CreateLinkEvent } from "../../../api";

interface CommunityManagerView {
    key: string;
    label: ReactNode;
}

const COMMUNITY_MANAGER_VIEWS: CommunityManagerView[] = [
    {
        key: 'users',
        label: (
            <>
                <FaIdCard style={{ marginRight: 8 }} />
                Users
            </>
        ),
    },
    {
        key: 'corps',
        label: (
            <>
                <FaBuilding style={{ marginRight: 8 }} />
                Corps
            </>
        )
    },
    {
        key: 'gangs',
        label: (
            <>
                <FaSkull style={{ marginRight: 8 }} />
                Gangs
            </>
        )
    },
]


export interface CommunityLayoutProps {
    children: ReactNode;
    tab: string;
    onClose(): void;
}

export function CommunityLayout({ children, tab, onClose }: CommunityLayoutProps) {

    return (
        <div className="modal" onClick={onClose}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    {
                        COMMUNITY_MANAGER_VIEWS.map(_ => (
                            <div className={`tab ${tab === _.key ? 'active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => CreateLinkEvent(`${_.key}/list`)}>
                                {_.label}
                            </div>
                        ))
                    }
                </div>
                <div className="menu-content">
                    <div className="h-100 w-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
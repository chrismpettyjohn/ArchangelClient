import { ReactNode, useEffect, useState } from "react";
import { FaBuilding, FaIdCard, FaSkull } from "react-icons/fa";
import { AddEventLinkTracker, CreateLinkEvent, RemoveLinkEventTracker } from "../../../api";
import { ILinkEventTracker } from "@nitro-rp/renderer";

interface CommunityManagerView {
    key: string;
    label: ReactNode;
}

const COMMUNITY_MANAGER_VIEWS: CommunityManagerView[] = [
    { key: 'users', label: <><FaIdCard style={{ marginRight: 8 }} /> Users</> },
    { key: 'corps', label: <><FaBuilding style={{ marginRight: 8 }} /> Corps</> },
    { key: 'gangs', label: <><FaSkull style={{ marginRight: 8 }} /> Gangs</> },
];

export interface CommunityLayoutProps {
    children: ReactNode;
    tab: string;
    onClose(): void;
}

export function CommunityLayout({ children, tab, onClose }: CommunityLayoutProps) {
    return (
        <div className="modal" onClick={onClose} style={{ overflow: 'auto' }}>
            <div id="habbo-roleplay-menu" onClick={e => e.stopPropagation()}>
                <div className="menu-tabs">
                    {COMMUNITY_MANAGER_VIEWS.map(view => (
                        <div
                            key={view.key}
                            className={`tab ${tab === view.key ? 'active' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => CreateLinkEvent(`community/${view.key}/list`)}
                        >
                            {view.label}
                        </div>
                    ))}
                </div>
                <div className="menu-content">
                    <div className="h-100 w-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LinkTrackerResult {
    active: boolean;
    resourceID?: number;
    onHide(): void;
}

export function useCommunityLinkTracker(resource: string, action: string): LinkTrackerResult {
    const [state, setState] = useState<{ active: boolean; resourceID?: number }>({ active: false });

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                const [_, urlResource, urlAction, urlResourceID] = url.split('/');

                if (urlResource === resource && urlAction === action) {
                    setState({
                        active: true,
                        resourceID: urlResourceID ? parseInt(urlResourceID, 10) : undefined,
                    });
                } else {
                    setState({ active: false });
                }
            },
            eventUrlPrefix: 'community',
        };

        AddEventLinkTracker(linkTracker);
        return () => RemoveLinkEventTracker(linkTracker);
    }, [resource, action]);

    return {
        ...state,
        onHide: () => setState({ active: false, resourceID: undefined }),
    };
}

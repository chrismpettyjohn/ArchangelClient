import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConvertGlobalRoomIdMessageComposer, HabboWebTools, ILinkEventTracker, LegacyExternalInterface, NavigatorCategoryDataParser, NavigatorInitComposer, NavigatorSearchComposer, NavigatorSearchResultSet, NavigatorTopLevelContext, RoomDataParser, RoomSessionEvent } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AddEventLinkTracker, GoToDesktop, LocalizeText, RemoveLinkEventTracker, SendMessageComposer, TryVisitRoom } from '../../api';
import { Base, Column, NitroCardContentView, NitroCardHeaderView, NitroCardTabsItemView, NitroCardTabsView, NitroCardView } from '../../common';
import { UpdateDoorStateEvent } from '../../events';
import { BatchUpdates, UseRoomSessionManagerEvent, useSharedState, UseUiEvent } from '../../hooks';
import { NavigatorData } from './common/NavigatorData';
import { NavigatorContextProvider } from './NavigatorContext';
import { NavigatorMessageHandler } from './NavigatorMessageHandler';
import { NavigatorRoomCreatorView } from './views/NavigatorRoomCreatorView';
import { NavigatorRoomDoorbellView } from './views/NavigatorRoomDoorbellView';
import { NavigatorRoomInfoView } from './views/NavigatorRoomInfoView';
import { NavigatorRoomLinkView } from './views/NavigatorRoomLinkView';
import { NavigatorRoomPasswordView } from './views/NavigatorRoomPasswordView';
import { NavigatorRoomSettingsView } from './views/room-settings/NavigatorRoomSettingsView';
import { NavigatorSearchResultView } from './views/search/NavigatorSearchResultView';
import { NavigatorSearchView } from './views/search/NavigatorSearchView';

export const NavigatorView: FC<{}> = props =>
{
    const [ isVisible, setIsVisible ] = useState(false);
    const [ isReady, setIsReady ] = useState(false);
    const [ isCreatorOpen, setCreatorOpen ] = useState(false);
    const [ isRoomInfoOpen, setRoomInfoOpen ] = useState(false);
    const [ isRoomLinkOpen, setRoomLinkOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ needsInit, setNeedsInit ] = useState(true);
    const [ needsSearch, setNeedsSearch ] = useState(false);
    const [ categories, setCategories ] = useState<NavigatorCategoryDataParser[]>(null);
    const [ topLevelContext, setTopLevelContext ] = useState<NavigatorTopLevelContext>(null);
    const [ topLevelContexts, setTopLevelContexts ] = useState<NavigatorTopLevelContext[]>(null);
    const [ navigatorData, setNavigatorData ] = useSharedState<NavigatorData>('@navigatorData', {
        settingsReceived: false,
        homeRoomId: 0,
        enteredGuestRoom: null,
        currentRoomOwner: false,
        currentRoomId: 0,
        currentRoomIsStaffPick: false,
        createdFlatId: 0,
        avatarId: 0,
        roomPicker: false,
        eventMod: false,
        currentRoomRating: 0,
        canRate: true
    });
    const [ searchResult, setSearchResult ] = useState<NavigatorSearchResultSet>(null);
    const [ pendingDoorState, setPendingDoorState ] = useState<{ roomData: RoomDataParser, state: string }>(null);
    const pendingSearch = useRef<{ value: string, code: string }>(null);

    const onUpdateDoorStateEvent = useCallback((event: UpdateDoorStateEvent) =>
    {
        switch(event.type)
        {
            case UpdateDoorStateEvent.START_DOORBELL:
                setPendingDoorState({ roomData: event.roomData, state: event.type });
                return;
            case UpdateDoorStateEvent.START_PASSWORD:
                setPendingDoorState({ roomData: event.roomData, state: event.type });
                return;
            case UpdateDoorStateEvent.STATE_WAITING:
                setPendingDoorState(prevValue =>
                    {
                        return { roomData: prevValue.roomData, state: event.type }
                    });
                return;
            case UpdateDoorStateEvent.STATE_NO_ANSWER:
                setPendingDoorState(prevValue =>
                    {
                        if(prevValue.state === UpdateDoorStateEvent.STATE_WAITING) GoToDesktop();

                        return { roomData: prevValue.roomData, state: event.type }
                    });
                return;
            case UpdateDoorStateEvent.STATE_WRONG_PASSWORD:
                setPendingDoorState(prevValue =>
                    {
                        return { roomData: prevValue.roomData, state: event.type }
                    });
                return;
            case UpdateDoorStateEvent.STATE_ACCEPTED:
                setPendingDoorState(null);
                return;
        }
    }, []);

    UseUiEvent(UpdateDoorStateEvent.START_DOORBELL, onUpdateDoorStateEvent);
    UseUiEvent(UpdateDoorStateEvent.START_PASSWORD, onUpdateDoorStateEvent);
    UseUiEvent(UpdateDoorStateEvent.STATE_WAITING, onUpdateDoorStateEvent);
    UseUiEvent(UpdateDoorStateEvent.STATE_NO_ANSWER, onUpdateDoorStateEvent);
    UseUiEvent(UpdateDoorStateEvent.STATE_WRONG_PASSWORD, onUpdateDoorStateEvent);
    UseUiEvent(UpdateDoorStateEvent.STATE_ACCEPTED, onUpdateDoorStateEvent);

    const onRoomSessionEvent = useCallback((event: RoomSessionEvent) =>
    {
        switch(event.type)
        {
            case RoomSessionEvent.CREATED:
                BatchUpdates(() =>
                {
                    setIsVisible(false);
                    setCreatorOpen(false);
                });
                return;
        }
    }, []);

    UseRoomSessionManagerEvent(RoomSessionEvent.CREATED, onRoomSessionEvent);

    const closePendingDoorState = useCallback((state: string) =>
    {
        if(state !== null)
        {
            setPendingDoorState(prevValue =>
                {
                    return { ...prevValue, state };
                });
        }
        else setPendingDoorState(null);
    }, []);

    const sendSearch = useCallback((searchValue: string, contextCode: string) =>
    {
        setCreatorOpen(false);

        SendMessageComposer(new NavigatorSearchComposer(contextCode, searchValue));

        setIsLoading(true);
    }, []);

    const reloadCurrentSearch = useCallback(() =>
    {
        if(!isReady)
        {
            setNeedsSearch(true);
            
            return;
        }

        if(pendingSearch.current)
        {
            sendSearch(pendingSearch.current.value, pendingSearch.current.code);

            pendingSearch.current = null;

            return;
        }

        if(searchResult)
        {
            sendSearch(searchResult.data, searchResult.code);

            return;
        }

        if(!topLevelContext) return;
        
        sendSearch('', topLevelContext.code);
    }, [ isReady, searchResult, topLevelContext, sendSearch ]);

    const linkReceived = useCallback((url: string) =>
    {
        const parts = url.split('/');

        if(parts.length < 2) return;

        switch(parts[1])
        {
            case 'show': {
                BatchUpdates(() =>
                {
                    setIsVisible(true);
                    setNeedsSearch(true);
                });
                return;
            }
            case 'hide':
                setIsVisible(false);
                return;
            case 'toggle': {
                if(isVisible)
                {
                    setIsVisible(false);

                    return;
                }

                BatchUpdates(() =>
                {
                    setIsVisible(true);
                    setNeedsSearch(true);
                });
                return;
            }
            case 'toggle-room-info':
                setRoomInfoOpen(value => !value);
                return;
            case 'toggle-room-link':
                setRoomLinkOpen(value => !value);
                return;
            case 'goto':
                if(parts.length <= 2) return;

                switch(parts[2])
                {
                    case 'home':
                        if(navigatorData.homeRoomId <= 0) return;

                        TryVisitRoom(navigatorData.homeRoomId);
                        break;
                    default: {
                        const roomId = parseInt(parts[2]);

                        TryVisitRoom(roomId);
                    }
                }
                return;
            case 'create':
                BatchUpdates(() =>
                {
                    setIsVisible(true);
                    setCreatorOpen(true);
                });
                return;
            case 'search':
                if(parts.length > 2)
                {
                    const topLevelContextCode = parts[2];

                    let searchValue = '';

                    if(parts.length > 3) searchValue = parts[3];

                    pendingSearch.current = { value: searchValue, code: topLevelContextCode };

                    BatchUpdates(() =>
                    {
                        setIsVisible(true);
                        setNeedsSearch(true);
                    });
                }
                return;
        } 
    }, [ isVisible, navigatorData.homeRoomId ]);

    useEffect(() =>
    {
        const linkTracker: ILinkEventTracker = {
            linkReceived,
            eventUrlPrefix: 'navigator/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [ linkReceived ]);

    useEffect(() =>
    {
        if(!searchResult) return;

        setIsLoading(false);
    }, [ searchResult ]);

    useEffect(() =>
    {
        if(!isVisible || !isReady || !needsSearch) return;

        reloadCurrentSearch();

        setNeedsSearch(false);
    }, [ isVisible, isReady, needsSearch, reloadCurrentSearch ]);

    useEffect(() =>
    {
        if(isReady || !topLevelContext) return;

        setIsReady(true);
    }, [ isReady, topLevelContext ]);

    useEffect(() =>
    {
        if(!isVisible || !needsInit) return;

        SendMessageComposer(new NavigatorInitComposer());

        setNeedsInit(false);
    }, [ isVisible, needsInit ]);

    useEffect(() =>
    {
        LegacyExternalInterface.addCallback(HabboWebTools.OPENROOM, (k: string, _arg_2: boolean = false, _arg_3: string = null) => SendMessageComposer(new ConvertGlobalRoomIdMessageComposer(k)));
    }, []);

    const getRoomDoorState = useMemo(() =>
    {
        if(!pendingDoorState) return null;

        switch(pendingDoorState.state)
        {
            case UpdateDoorStateEvent.START_DOORBELL:
            case UpdateDoorStateEvent.STATE_WAITING:
            case UpdateDoorStateEvent.STATE_NO_ANSWER:
                return <NavigatorRoomDoorbellView roomData={ pendingDoorState.roomData } state={ pendingDoorState.state } onClose={ closePendingDoorState } />;
            case UpdateDoorStateEvent.START_PASSWORD:
            case UpdateDoorStateEvent.STATE_WRONG_PASSWORD:
                return <NavigatorRoomPasswordView roomData={ pendingDoorState.roomData } state={ pendingDoorState.state } onClose={ closePendingDoorState } />;
        }

        return null;
    }, [ pendingDoorState, closePendingDoorState ]);

    return (
        <NavigatorContextProvider value={ { categories, setCategories, topLevelContext, setTopLevelContext, topLevelContexts, setTopLevelContexts, navigatorData, setNavigatorData, searchResult, setSearchResult } }>
            <NavigatorMessageHandler />
            { getRoomDoorState }
            { isVisible &&
                <NitroCardView uniqueKey="navigator" className="nitro-navigator">
                    <NitroCardHeaderView headerText={ LocalizeText(isCreatorOpen ? 'navigator.createroom.title' : 'navigator.title') } onCloseClick={ event => setIsVisible(false) } />
                    <NitroCardTabsView>
                        { topLevelContexts && (topLevelContexts.length > 0) && topLevelContexts.map((context, index) =>
                            {
                                return (
                                    <NitroCardTabsItemView key={ index } isActive={ ((topLevelContext === context) && !isCreatorOpen) } onClick={ event => sendSearch('', context.code) }>
                                        { LocalizeText(('navigator.toplevelview.' + context.code)) }
                                    </NitroCardTabsItemView>
                                );
                            }) }
                        <NitroCardTabsItemView isActive={ isCreatorOpen } onClick={ event => setCreatorOpen(true) }>
                            <FontAwesomeIcon icon="plus" />
                        </NitroCardTabsItemView>
                    </NitroCardTabsView>
                    <NitroCardContentView position='relative'>
                        { isLoading &&
                            <Base fit position="absolute" className="top-0 start-0 z-index-1 bg-muted opacity-0-5" /> }
                        { !isCreatorOpen &&
                            <>
                                <NavigatorSearchView sendSearch={ sendSearch } />
                                <Column overflow="auto">
                                    { (searchResult && searchResult.results.map((result, index) => <NavigatorSearchResultView key={ index } searchResult={ result } />)) }
                                </Column>
                            </> }
                        { isCreatorOpen && <NavigatorRoomCreatorView /> }
                    </NitroCardContentView>
                </NitroCardView> }
            { isRoomInfoOpen && <NavigatorRoomInfoView onCloseClick={ () => setRoomInfoOpen(false) } /> }
            { isRoomLinkOpen && <NavigatorRoomLinkView onCloseClick={ () => setRoomLinkOpen(false) } /> }
            <NavigatorRoomSettingsView />
        </NavigatorContextProvider>
    );
}

import { CancelTaxiComposer, ConvertGlobalRoomIdMessageComposer, HabboWebTools, ILinkEventTracker, LegacyExternalInterface, NavigatorInitComposer, NavigatorSearchComposer, RoomDataParser, RoomEnterEvent, RoomSessionEvent, TaxiInformation, TaxiStandEvent } from '@nitro-rp/renderer';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AddEventLinkTracker, GetSessionDataManager, LocalizeText, RemoveLinkEventTracker, SendMessageComposer, TryVisitRoom } from '../../api';
import { Base, Button, Column, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../common';
import { useMessageEvent, useNavigator, useRoom, useRoomSessionManagerEvent } from '../../hooks';
import { NavigatorDoorStateView } from './views/NavigatorDoorStateView';
import { NavigatorRoomCreatorView } from './views/NavigatorRoomCreatorView';
import { NavigatorRoomSettingsView } from './views/room-settings/NavigatorRoomSettingsView';
import { NavigatorSearchResultView } from './views/search/NavigatorSearchResultView';
import { NavigatorRoomInfoView } from './views/search/NavigatorRoomInfoView';
import { taxiFeeQuery } from '../../api/roleplay/game/TaxiFeeQuery';
import { CallTaxi } from '../../api/roleplay/taxi/CallTaxi';
import { useRoleplayPermissions } from '../../hooks/roleplay/use-roleplay-permissions';

export function NavigatorView() {
    const [taxiOnly, setTaxiOnly] = useState(false);
    const { roomSession } = useRoom();
    const rpPerms = useRoleplayPermissions();
    const [taxiInfo, setTaxiInfo] = useState<TaxiInformation>();
    const [isVisible, setIsVisible] = useState(false);
    const [taxiTimeLeft, setTaxiTimeLeft] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isCreatorOpen, setCreatorOpen] = useState(false);
    const [isRoomInfoOpen, setRoomInfoOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [needsInit, setNeedsInit] = useState(true);
    const [needsSearch, setNeedsSearch] = useState(false);
    const { searchResult = null, topLevelContext = null, navigatorData = null } = useNavigator();
    const pendingSearch = useRef<{ value: string, code: string }>(null);
    const elementRef = useRef<HTMLDivElement>();

    const onCancelTrip = useCallback(() => {
        SendMessageComposer(new CancelTaxiComposer())
        setTaxiTimeLeft(0);
    }, [setTaxiTimeLeft]);

    useRoomSessionManagerEvent<RoomSessionEvent>(RoomSessionEvent.CREATED, event => {
        setIsVisible(false);
        setCreatorOpen(false);
    });

    const sendSearch = useCallback((searchValue: string, contextCode: string) => {
        setCreatorOpen(false);

        SendMessageComposer(new NavigatorSearchComposer(contextCode, searchValue));

        setIsLoading(true);
    }, []);


    const reloadCurrentSearch = useCallback(() => {
        if (!isReady) {
            setNeedsSearch(true);

            return;
        }

        if (pendingSearch.current) {
            sendSearch(pendingSearch.current.value, pendingSearch.current.code);

            pendingSearch.current = null;

            return;
        }

        if (searchResult) {
            sendSearch(searchResult.data, searchResult.code);

            return;
        }

        if (!topLevelContext) return;

        sendSearch('', topLevelContext.code);
    }, [isReady, searchResult, topLevelContext, sendSearch]);

    function onToggleTaxi() {
        if (!rpPerms.canSeeAllRooms) {
            return;
        }
        setTaxiOnly(_ => !_);
    }

    function onVisitRoom(roomData: RoomDataParser) {
        if (roomData.roomId === roomSession?.roomId) {
            return;
        }
        if (taxiTimeLeft) return;
        setTaxiTimeLeft(taxiInfo?.delay);
        CallTaxi(roomData.roomId);
    }


    useMessageEvent<RoomEnterEvent>(RoomEnterEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        setTaxiTimeLeft(0);
        setIsVisible(false);
    });

    useEffect(() => {
        const linkTracker: ILinkEventTracker = {
            linkReceived: (url: string) => {
                if (!GetSessionDataManager().isModerator) {
                    return;
                }
                const parts = url.split('/');

                if (parts.length < 2) return;

                switch (parts[1]) {
                    case 'show': {
                        setIsVisible(true);
                        setNeedsSearch(true);
                        return;
                    }
                    case 'hide':
                        setIsVisible(false);
                        return;
                    case 'toggle': {
                        if (isVisible) {
                            setIsVisible(false);

                            return;
                        }

                        setIsVisible(true);
                        setNeedsSearch(true);
                        return;
                    }
                    case 'toggle-room-info':
                        setRoomInfoOpen(value => !value);
                        return;
                    case 'goto':
                        if (parts.length <= 2) return;

                        switch (parts[2]) {
                            case 'home':
                                if (navigatorData.homeRoomId <= 0) return;

                                TryVisitRoom(navigatorData.homeRoomId);
                                break;
                            default: {
                                const roomId = parseInt(parts[2]);

                                TryVisitRoom(roomId);
                            }
                        }
                        return;
                    case 'create':
                        setIsVisible(true);
                        setCreatorOpen(true);
                        return;
                    case 'search':
                        if (parts.length > 2) {
                            const topLevelContextCode = parts[2];

                            let searchValue = '';

                            if (parts.length > 3) searchValue = parts[3];

                            pendingSearch.current = { value: searchValue, code: topLevelContextCode };

                            setIsVisible(true);
                            setNeedsSearch(true);
                        }
                        return;
                }
            },
            eventUrlPrefix: 'navigator/'
        };

        AddEventLinkTracker(linkTracker);

        return () => RemoveLinkEventTracker(linkTracker);
    }, [isVisible, navigatorData]);

    useEffect(() => {
        if (!searchResult) return;

        setIsLoading(false);

        if (elementRef && elementRef.current) elementRef.current.scrollTop = 0;
    }, [searchResult]);

    useEffect(() => {
        if (!isVisible || !isReady || !needsSearch) return;

        reloadCurrentSearch();

        setNeedsSearch(false);
    }, [isVisible, isReady, needsSearch, reloadCurrentSearch]);

    useEffect(() => {
        if (isReady || !topLevelContext) return;

        setIsReady(true);
    }, [isReady, topLevelContext]);

    useEffect(() => {
        if (!isVisible || !needsInit) return;

        SendMessageComposer(new NavigatorInitComposer());

        setNeedsInit(false);
    }, [isVisible, needsInit]);

    useEffect(() => {
        LegacyExternalInterface.addCallback(HabboWebTools.OPENROOM, (k: string, _arg_2: boolean = false, _arg_3: string = null) => SendMessageComposer(new ConvertGlobalRoomIdMessageComposer(k)));
    }, []);

    useEffect(() => {
        taxiFeeQuery();
    }, []);

    useMessageEvent<TaxiStandEvent>(TaxiStandEvent, event => {
        const parser = event.getParser();
        if (!parser) return;
        setTaxiInfo(parser.taxiInfo);
        setIsVisible(true);
        setNeedsSearch(true);
    });

    useEffect(() => {
        let timer;

        if (taxiTimeLeft > 0) {
            timer = setInterval(() => {
                setTaxiTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [taxiTimeLeft]);

    return (
        <>
            {isVisible &&
                <NitroCardView uniqueKey="navigator" className="nitro-navigator" style={{ height: 300, width: 300 }}>
                    <NitroCardHeaderView headerText={LocalizeText(isCreatorOpen ? 'Create Room' : 'Taxi')} onCloseClick={() => setIsVisible(false)} />
                    <NitroCardContentView position="relative">
                        {
                            taxiTimeLeft
                                ? (
                                    <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text bold fontSize={2}>Taxi called</Text>
                                        <Text fontSize={6}>The taxi has been called and is on the way!</Text>
                                        <div style={{ background: 'white', width: 250, height: 4, marginTop: 10, marginBottom: 10 }} />
                                        <Text bold fontSize={4}> <b style={{ color: '#A7B2FE' }}>{taxiTimeLeft} secs</b> remaining</Text>
                                        <div style={{ marginTop: 'auto' }}>
                                            <Button variant="danger" onClick={onCancelTrip}>Cancel Trip</Button>
                                            <br />
                                            <Text fontSize={5}><small style={{ color: 'red' }}>Your trip will be cancelled if you leave the stand.</small></Text>
                                        </div>
                                    </div>
                                )
                                : (
                                    <>
                                        {
                                            rpPerms.canSeeAllRooms && (
                                                <Base className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="taxiOnly" checked={taxiOnly} onChange={onToggleTaxi} />
                                                    <label className="form-check-label" style={{ color: 'white' }}>Show all rooms</label>
                                                </Base>
                                            )
                                        }
                                        {isLoading &&
                                            <Base fit position="absolute" className="top-0 start-0 z-index-1 bg-muted opacity-0-5" />}
                                        {!isCreatorOpen &&
                                            <>
                                                <Column innerRef={elementRef} overflow="auto">
                                                    {(searchResult && searchResult.results.map((result, index) => <NavigatorSearchResultView key={index} searchResult={result} taxiFee={taxiInfo?.fee} taxiPending={!!taxiTimeLeft} onVisitRoom={onVisitRoom} canSeeAllRooms={taxiOnly} />))}
                                                </Column>
                                            </>}
                                        {isCreatorOpen && <NavigatorRoomCreatorView />}
                                    </>
                                )
                        }

                    </NitroCardContentView>
                </NitroCardView >}
            <NavigatorDoorStateView />
            {isRoomInfoOpen && <NavigatorRoomInfoView onCloseClick={() => setRoomInfoOpen(false)} />}
            <NavigatorRoomSettingsView />
        </>
    );
}

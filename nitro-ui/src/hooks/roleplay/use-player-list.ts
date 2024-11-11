import { PlayerListData, PlayerQueryListComposer, PlayerQueryListEvent } from "@nitro-rp/renderer";
import { useEffect, useState } from "react";
import { useMessageEvent } from "../events";
import { SendMessageComposer } from "../../api";

export function usePlayerList(page: number, query: string): Array<PlayerListData> {
    const [players, setPlayers] = useState<PlayerListData[]>([]);

    useEffect(() => {
        SendMessageComposer(new PlayerQueryListComposer(page, query))
    }, [page, query]);

    useMessageEvent<PlayerQueryListEvent>(PlayerQueryListEvent, event => {
        const parser = event.getParser();
        setPlayers(parser.players);
    });

    return players;
}
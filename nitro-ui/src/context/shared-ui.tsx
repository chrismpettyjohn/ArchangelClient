import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

export enum FocusMode {
    Controls = 'controls',
    Modal = 'modal',
}

export interface SharedUIContextType {
    focus: FocusMode;
    setFocus(focusMode: FocusMode): void;
}

const SharedUIContext = createContext<SharedUIContextType | undefined>(undefined);

export function SharedUIProvider({ children }: { children: ReactNode }) {
    const [focus, setFocus] = useState(FocusMode.Controls);

    return <SharedUIContext.Provider value={{ focus, setFocus }}> {children} </SharedUIContext.Provider>;
};

export function useSharedUI(): SharedUIContextType {
    const context = useContext(SharedUIContext);
    if (!context) {
        throw new Error("useSharedUI must be used within a SharedUIProvider");
    }
    return context;
}

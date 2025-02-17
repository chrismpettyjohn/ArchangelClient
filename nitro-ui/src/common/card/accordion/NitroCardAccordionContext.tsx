import { createContext, Dispatch, FC, ProviderProps, SetStateAction, useCallback, useContext, useState } from 'react';

export interface INitroCardAccordionContext {
    active: string;
    onToggle(key: string): void;
}

const NitroCardAccordionContext = createContext<INitroCardAccordionContext>({
    active: '',
    onToggle: () => { },
});

export const NitroCardAccordionContextProvider: FC<ProviderProps<INitroCardAccordionContext>> = props => {
    return <NitroCardAccordionContext.Provider {...props} />;
}

export const useNitroCardAccordionContext = () => useContext(NitroCardAccordionContext);

import { NavigatorCategoryDataParser, NavigatorSearchResultSet, NavigatorTopLevelContext } from '@nitrots/nitro-renderer';
import { createContext, Dispatch, FC, ProviderProps, SetStateAction, useContext } from 'react';
import { NavigatorData } from './common/NavigatorData';

interface INavigatorContext
{
    categories: NavigatorCategoryDataParser[];
    setCategories: Dispatch<SetStateAction<NavigatorCategoryDataParser[]>>;
    topLevelContext: NavigatorTopLevelContext;
    setTopLevelContext: Dispatch<SetStateAction<NavigatorTopLevelContext>>;
    topLevelContexts: NavigatorTopLevelContext[];
    setTopLevelContexts: Dispatch<SetStateAction<NavigatorTopLevelContext[]>>;
    navigatorData: NavigatorData;
    setNavigatorData: Dispatch<SetStateAction<NavigatorData>>;
    searchResult: NavigatorSearchResultSet;
    setSearchResult: Dispatch<SetStateAction<NavigatorSearchResultSet>>;
}

const NavigatorContext = createContext<INavigatorContext>({
    categories: null,
    setCategories: null,
    topLevelContext: null,
    setTopLevelContext: null,
    topLevelContexts: null,
    setTopLevelContexts: null,
    navigatorData: null,
    setNavigatorData: null,
    searchResult: null,
    setSearchResult: null
});

export const NavigatorContextProvider: FC<ProviderProps<INavigatorContext>> = props =>
{
    return <NavigatorContext.Provider value={ props.value }>{ props.children }</NavigatorContext.Provider>
}

export const useNavigatorContext = () => useContext(NavigatorContext);

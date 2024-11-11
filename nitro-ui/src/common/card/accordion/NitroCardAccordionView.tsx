import { FC, useCallback, useState } from 'react';
import { Column, ColumnProps } from '../..';
import { NitroCardAccordionContextProvider } from './NitroCardAccordionContext';

interface NitroCardAccordionViewProps extends ColumnProps {

}

export const NitroCardAccordionView: FC<NitroCardAccordionViewProps> = ({ ...rest }) => {

    const [active, setActive] = useState('');
    const onToggle = useCallback((key: string) => {
        setActive(_ => _ === key ? '' : key);
    }, [setActive]);

    return (
        <NitroCardAccordionContextProvider value={{ active, onToggle }}>
            <Column gap={0} {...rest} />
        </NitroCardAccordionContextProvider>
    );
}

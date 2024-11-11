import { FC, useEffect, useMemo, useId } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Column, ColumnProps, Flex, Text } from '../..';
import { useNitroCardAccordionContext } from './NitroCardAccordionContext';

export interface NitroCardAccordionSetViewProps extends ColumnProps {
    headerText: string;
    isExpanded?: boolean;
}

export const NitroCardAccordionSetView: FC<NitroCardAccordionSetViewProps> = ({
    headerText = '',
    isExpanded = false,
    gap = 0,
    classNames = [],
    children = null,
    ...rest
}) => {
    const { active, onToggle } = useNitroCardAccordionContext();
    const uniqueKey = useId();
    const isOpen = useMemo(() => active === uniqueKey, [active]);

    const getClassNames = useMemo(() => [
        'nitro-card-accordion-set',
        active === uniqueKey && 'active',
        ...classNames,
    ].filter(Boolean), [active, classNames]);

    useEffect(() => {
        if (isExpanded) {
            onToggle(uniqueKey);
            return () => onToggle(uniqueKey);
        }
    }, [isExpanded, onToggle]);

    return (
        <Column classNames={getClassNames} gap={gap} {...rest}>
            <Flex pointer justifyContent="between" className="nitro-card-accordion-set-header px-2 py-1" onClick={() => onToggle(uniqueKey)}>
                <Text variant="white">{headerText}</Text>
                {isOpen ? <FaCaretUp className="fa-icon" /> : <FaCaretDown className="fa-icon" />}
            </Flex>
            {isOpen && (
                <Column fullHeight overflow="auto" gap={0} className="nitro-card-accordion-set-content" style={{ padding: 8 }}>
                    {children}
                </Column>
            )}
        </Column>
    );
};

import { FC, ReactNode } from 'react';
import { Transition } from 'react-transition-group';
import { getTransitionAnimationStyle } from './TransitionAnimationStyles';

interface TransitionAnimationProps {
    type: string;
    inProp: boolean;
    timeout?: number;
    className?: string;
    children?: ReactNode;
}

export const TransitionAnimation: FC<TransitionAnimationProps> = props => {
    const { type = null, inProp = false, timeout = 300, className = null, children = null } = props;

    return (
        <Transition in={inProp} timeout={timeout} unmountOnExit>
            {state => (
                <div
                    className={(className ?? '') + ' animate__animated'}
                    style={{ ...getTransitionAnimationStyle(type, state, timeout) }}
                >
                    {children}
                </div>
            )}
        </Transition>
    );
};

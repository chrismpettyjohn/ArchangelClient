import { useEffect, useRef } from "react";

export const useDebouncedEffect = (callback: () => void, dependencies: any[], delay: number) => {
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            callback();
        }, delay);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [...dependencies, delay]);
};
import {useEffect, useState} from "react";

export function useDebounce(value: any, delayMilliseconds: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delayMilliseconds);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delayMilliseconds]);

    return debouncedValue;
}
import { useState, useEffect } from "react";

const isClient = typeof window === 'object';

const getSize = () => {
    return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
    };
}


export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getSize());

    useEffect(() => {
        if (isClient) {
            const handleResize = () => {
                setWindowSize(getSize());
            }
        
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowSize;
}
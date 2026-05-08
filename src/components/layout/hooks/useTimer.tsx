import { useEffect, useMemo, useRef, useState } from "react";

export default function useTimer(startValue: number) {
    const [timer, setTimer] = useState(startValue);
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    const start = () => {
        if (intervalRef.current) return; // evita doppi timer

        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stop = () => {
        if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }
    };

    const reset = () => {
        stop();
        setTimer(startValue);
    };
    
    const isTimeOver = useMemo(() => timer === 0, [timer]);

    useEffect(() => {
        return () => stop();
    }, []);

    return {timer, isTimeOver, start, stop, reset}
}
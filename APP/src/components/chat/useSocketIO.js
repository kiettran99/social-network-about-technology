import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocketIO = (...args) => {
    const { current: socket } = useRef(io(...args));

    useEffect(() => {
        return () => {
            if (socket) {
                socket.removeAllListeners();
                socket.close();
            }
        };
    }, [socket]);

    return { socket };
};

export default useSocketIO;
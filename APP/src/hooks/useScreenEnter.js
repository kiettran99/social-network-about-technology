import { useEffect, useState } from 'react';

const useScreenEnter = (ref, callback) => {
    const [entered, setEntered] = useState(false);

    const isInViewPort = (rect) => {
        if (window.screen.height >= rect.bottom &&
            window.screen.width >= rect.right &&
            rect.top >= 0 &&
            rect.left >= 0) {
            return true;
        }
        return false;
    };

    const active = () => {
        if (ref.current && isInViewPort(ref.current.getBoundingClientRect()) &&
            !entered) {
            setEntered(true);
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', active);

        return () => document.removeEventListener('scroll', active)
    }, [entered]);
};

export default useScreenEnter;
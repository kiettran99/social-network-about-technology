import React, { useEffect, useState, useRef } from 'react';
import useScreenEnter from '../../../hooks/useScreenEnter';

const Process = ({ length, loading, actionDispatch }) => {
    const ref = useRef(null);
    const skip = 5;

    const [isTrigged, setIsTrigged] = useState(false);
    const [lastLength, setLastLength] = useState(0);

    const setEntered = useScreenEnter(ref, () => {
        setIsTrigged(true);
    });

    useEffect(() => {

        if (length >= skip && lastLength !== length - skip) {
            setLastLength(length - skip);
            setEntered(false);
        }

        if (isTrigged) {
            actionDispatch(length, skip);
            setIsTrigged(false);
        }
    }, [isTrigged, length]);

    return !loading && (
        <img ref={ref} src="/images/page-img/page-load-loader.gif" alt="loader" style={{ height: '100px' }} />
    );
};

export default Process;


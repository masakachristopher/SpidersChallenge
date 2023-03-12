import React, { Fragment, useState, useEffect } from 'react';


const Loader = () => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

    const [show, setShow] = useState<Boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };

    }, [show]);

    return (
        <Fragment>
            <div className='flex'>
                <div className={`${circleCommonClasses} mr-1`}></div>
                <div className={`${circleCommonClasses} mr-1`}></div>
                <div className={`${circleCommonClasses}`}></div>
            </div>
        </Fragment>
    );
};

export default Loader;
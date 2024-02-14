import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function Select({ className = '', isFocused = false, ...props }, ref) {
    const select = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    return (
        
            <select
                {...props}
                className={
                    'peer rounded-md border-0 py-1.5 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-transparent focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 ' +
                    className
                }
                ref={select}
            />
        
    );
});
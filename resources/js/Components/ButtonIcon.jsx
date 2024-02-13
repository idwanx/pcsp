export default function ButtonIcon({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={ 
                `group inline-flex justify-center rounded-md px-2.5 py-2 text-sm font-medium ring-1 ring-gray-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-gray-300 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

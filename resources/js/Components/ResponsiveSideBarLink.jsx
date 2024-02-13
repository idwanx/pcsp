import { Link } from '@inertiajs/react';

export default function ResponsiveSideBarLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`tracking-wide group relative flex items-center gap-x-2 rounded-lg p-2 text-sm ${
                active
                    ? 'group border-gray-400 text-gray-800 bg-gray-200 focus:text-gray-700 focus:bg-gray-200 focus:border-gray-700'
                    : 'group border-transparent text-gray-500 hover:text-gray-600 hover:bg-gray-100 hover:border-gray-300 focus:text-gray-700 focus:bg-gray-50 focus:border-gray-300'
            } font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}

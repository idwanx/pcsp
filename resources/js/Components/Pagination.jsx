import { Link } from '@inertiajs/react';

export default function Pagination({ meta }) {
  
    return ( 
        <div className="flex items-center gap-x-1 !mb-4">
            {meta.links.map((link, key) => {
                return link.url === null ? <span key={key} className="text-gray-500 mx-4" dangerouslySetInnerHTML={{ __html: link.label }} /> :
                    <Link key={key}
                        className={`${link.active ? 'text-gray-700 font-semibold' : 'text-gray-500'} text-xs lg:text-sm px-3 py-1 border border-gray-200 rounded-lg bg-white`}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }} />;
            })}
        </div>
    );
}
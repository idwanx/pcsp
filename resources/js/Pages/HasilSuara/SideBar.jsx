import { usePage } from '@inertiajs/react';
import ResponsiveSideBarLink from '@/Components/ResponsiveSideBarLink';
import {
  DocumentPlusIcon, DocumentMinusIcon, DocumentCheckIcon, UserIcon, ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export default function SideBar() {
  const { partai, tahun, auth } = usePage().props;
  
  return (
    <div className="bg-white p-3 shadow-sm sm:rounded-lg lg:flex flex-shrink-0 flex-col gap-y-2 border border-gray-200">
        <ResponsiveSideBarLink href={route('hasilsuara.dashboard', { partai: partai, tahun: tahun })} active={route().current('hasilsuara.dashboard')}>
            <ComputerDesktopIcon className="h-5 w-5 group:text-gray-500" aria-hidden="true" />
          <div className="flex-auto">
            <span className="block group:font-semibold group:text-gray-500">
              Dashboard
            </span>
          </div>
        </ResponsiveSideBarLink>
        
        <ResponsiveSideBarLink href="#">
            <DocumentCheckIcon className="h-5 w-5 group:text-gray-500" aria-hidden="true" />
          <div className="flex-auto">
            <span className="block group:font-semibold group:text-gray-500">
              Penggunaan
            </span>
          </div>
        </ResponsiveSideBarLink>

        <ResponsiveSideBarLink href="#">
            <UserIcon className="h-5 w-5 group:text-gray-500" aria-hidden="true" />
          <div className="flex-auto">
            <span className="block group:font-semibold group:text-gray-500">
              Peserta Didik
            </span>
          </div>
        </ResponsiveSideBarLink>
    </div>
  )
}

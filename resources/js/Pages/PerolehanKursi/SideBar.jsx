import { usePage } from '@inertiajs/react';
import ResponsiveSideBarLink from '@/Components/ResponsiveSideBarLink';
import {
  ComputerDesktopIcon, EnvelopeIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function SideBar() {
  const { partai, tahun, menupemilu, pemilu } = usePage().props;
 
  return (
    <>
    <div className="bg-white p-3 shadow-sm sm:rounded-lg lg:flex flex-shrink-0 flex-col gap-y-2 border border-gray-200">
        {menupemilu?.map(item => {
            return (
              <ResponsiveSideBarLink key={item.id} href={route('perolehankursi.rekap', { partai: partai, tahun: tahun, pemilu: item.id })} active={pemilu ? pemilu.id == item.id : ''}>
                <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                <div className="flex-auto">
                  <span className="block group:font-semibold group:text-gray-500">
                    {item.nama_pemilu}
                  </span>
                </div>
              </ResponsiveSideBarLink>
            )
        })}
    </div>
  </>
  )
}

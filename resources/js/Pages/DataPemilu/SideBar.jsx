import ResponsiveSideBarLink from '@/Components/ResponsiveSideBarLink';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

export default function SideBar() {
    return (
      <>
        <div className="hidden sm:w-1/5 lg:block md:hidden">
            <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <div className="bg-white p-3 shadow-sm sm:rounded-lg lg:flex flex-shrink-0 flex-col gap-y-2 border border-gray-200">
                    <ResponsiveSideBarLink href={route('datapemilu.pemilu')} active={route().current('datapemilu.pemilu')}>
                        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
                    <div className="flex-auto">
                        <span className="block group:font-semibold group:text-gray-500">
                            Pemilu
                        </span>
                    </div>
                    </ResponsiveSideBarLink>

                    <ResponsiveSideBarLink href={route('datapemilu.dapil')} active={route().current('datapemilu.dapil')}>
                        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
                    <div className="flex-auto">
                        <span className="block group:font-semibold group:text-gray-500">
                            Dapil
                        </span>
                    </div>
                    </ResponsiveSideBarLink>

                    <ResponsiveSideBarLink href={route('datapemilu.tps')} active={route().current('datapemilu.tps')}>
                        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
                    <div className="flex-auto">
                        <span className="block group:font-semibold group:text-gray-500">
                            TPS
                        </span>
                    </div>
                    </ResponsiveSideBarLink>

                    <ResponsiveSideBarLink href={route('datapemilu.calon')} active={route().current('datapemilu.calon')}>
                        <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />
                    <div className="flex-auto">
                        <span className="block group:font-semibold group:text-gray-500">
                            Calon
                        </span>
                    </div>
                    </ResponsiveSideBarLink>

                </div>
            </div>
        </div>
    </>
    )
  }
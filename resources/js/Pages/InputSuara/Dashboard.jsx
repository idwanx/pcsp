import App from '@/Layouts/App';
import { Head } from '@inertiajs/react';
import SideBar from './SideBar';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {

    const kembali = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Suara TPS" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
                <div className="hidden sm:w-1/5 lg:block md:hidden">
                    <div className="-mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <SideBar/>
                    </div>
                </div>
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex shrink-0">
                        <div className="space-y-3 bg-white overflow-hidden shadow-sm sm:rounded-lg text-sm p-4">
                            <div className="flex items-center justify-between">
                                <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">Dashboard</div>
                                <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-purple-500" /></button>
                            </div>
                            <hr />
                            <div className="overflow-x-auto">
                                <div className="focus:outline-none pt-4 pb-2 font-bold text-gray-600">Input Suara</div>
                                {/* content */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <App children={page} />
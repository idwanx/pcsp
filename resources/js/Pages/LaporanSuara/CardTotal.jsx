import { usePage } from '@inertiajs/react';

export default function CardTotal() {
    const { total} = usePage().props;

  return (
    <div className="flex flex-col">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="shadow rounded-lg px-3 py-2.5 bg-white">
                <h1 className="font-normal text-gray-600">Total Pemilih</h1>
                <div className="flex flex-row items-center mt-2">
                    <div className="inline-flex items-center py-1 text-lg font-medium">
                        {Number(total.total_pemilih).toLocaleString("id-ID")}
                    </div>
                </div>
            </div>

            <div className="shadow rounded-lg px-3 py-2.5 bg-white">
                <h1 className="font-normal text-gray-600">Suara Sah</h1>
                <div className="flex flex-row justify-between items-center mt-2">
                    <div>
                        <h6 className="text-green-600 text-lg font-bold text-left">
                            {Number(total.total_suara_sah).toLocaleString("id-ID")}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-lg font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {parseFloat(total.total_suara_sah/total.total_pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="shadow rounded-lg px-3 py-2.5 bg-white">
                <h1 className="font-normal text-gray-600">Suara Rusak</h1>
                <div className="flex flex-row justify-between items-center mt-2">
                    <div>
                        <h6 className="text-rose-600 text-lg font-bold text-left">
                            {Number(total.total_suara_rusak).toLocaleString("id-ID")}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-1 text-lg font-medium text-rose-700 ring-1 ring-inset ring-rose-600/10">
                        {parseFloat(total.total_suara_rusak/total.total_pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="shadow rounded-lg px-3 py-2.5 bg-white">
                <h1 className="font-normal text-gray-600">Sisa Suara</h1>
                <div className="flex flex-row justify-between items-center mt-2">
                    <div>
                        <h6 className="text-indigo-600 text-lg font-bold text-left">
                            {Number(total.total_sisa).toLocaleString("id-ID")}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-lg font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    {parseFloat(total.total_sisa/total.total_pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>
            
        </div>
    </div>
  )
}

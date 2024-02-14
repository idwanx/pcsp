import { usePage } from '@inertiajs/react';

export default function CardPerDapil() {
    const { filterdapil } = usePage().props;

  return (
    <div className="flex flex-col pt-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            <div className="px-3 py-2.5 bg-white rounded-lg ring-1 ring-inset ring-gray-600/20">
                <h1 className="font-normal text-gray-600">Jumlah Pemilih</h1>
                <div className="flex flex-row items-center mt-1">
                        <div className="flex rounded-full py-1 text-sm font-normal text-gray-700">
                            {Number(filterdapil.pemilih).toLocaleString("id-ID")}
                        </div>
                </div>
            </div>

            <div className="px-3 py-2.5 bg-white rounded-lg ring-1 ring-inset ring-gray-600/20">
                <h1 className="font-normal text-gray-600">Suara Sah</h1>
                <div className="flex flex-row justify-between items-center mt-1">
                    <div>
                        <h6 className="text-gray-600 text-sm font-medium text-left">
                            {Number(filterdapil.suara_sah).toLocaleString("id-ID")}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-sm font-normal text-gray-700 ring-1 ring-inset ring-gray-600/20">
                        {parseFloat(filterdapil.suara_sah/filterdapil.pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>


            <div className="px-3 py-2.5 bg-white rounded-lg ring-1 ring-inset ring-gray-600/20">
                <h1 className="font-normal text-gray-600">Suara Rusak</h1>
                <div className="flex flex-row justify-between items-center mt-1">
                    <div>
                        <h6 className="text-gray-600 text-sm font-medium text-left">
                            {filterdapil.suara_rusak}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-sm font-normal text-gray-700 ring-1 ring-inset ring-gray-600/20">
                    {parseFloat(filterdapil.suara_rusak/filterdapil.pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>


            <div className="px-3 py-2.5 bg-white rounded-lg ring-1 ring-inset ring-gray-600/20">
                <h1 className="font-normal text-gray-600">Sisa Suara</h1>
                <div className="flex flex-row justify-between items-center mt-1">
                    <div>
                        <h6 className="text-gray-600 text-sm font-medium text-left">
                            {Number(filterdapil.pemilih-(filterdapil.suara_sah+filterdapil.suara_rusak)).toLocaleString("id-ID")}
                        </h6>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-sm font-normal text-gray-700 ring-1 ring-inset ring-gray-600/20">
                        {parseFloat((filterdapil.pemilih-filterdapil.suara_sah-filterdapil.suara_rusak)/filterdapil.pemilih*100).toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

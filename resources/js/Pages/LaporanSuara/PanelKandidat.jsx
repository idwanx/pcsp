import { useState, useEffect } from 'react';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { usePage } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function PanelKandidat({setIsPanelKandidat, model, judul}) {
    const { partai, tahun } = usePage().props;
    const [kandidats, setKandidat] = useState([]);

    const [state, setState] = useState([]);
    
    useEffect(() => {
        if(model.id) {
            async function fetchData() {
                await fetch(route('laporansuara.kandidat', { partai: partai, tahun: tahun, tpsuara: model.id }))
                  .then(response => response.json())
                  .then(data => setKandidat(data.dataKandidat))
              }
              fetchData();
        }
        
    }, [model.id]);

    const closePanelKandidat = () => {
         setIsPanelKandidat(false);
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{judul}</h3>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => closePanelKandidat(false)}
                        >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <span className="text-sm font-normal text-gray-500">Dari jumlah suara sah {model.nama_tpsuara}</span>
                <hr className='mt-2' />
                <div className="py-6">
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200">
                            {kandidats?.map((kandidat, index) => (
                            <li key={index} className="flex py-3 items-center">
                                {kandidat.foto == null ?
                                    <UserCircleIcon className="w-16 h-16 stroke-gray-400 stroke-1 inline -mt-0.5" />
                                :
                                    <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={`/storage/${kandidat.foto}`} alt="" />
                                }
                                <div className="ml-4 flex flex-1 flex-col min-w-0">
                                    <div className='min-w-0 flex-auto'>
                                        <div className="flex justify-between text-md font-medium text-gray-600">
                                            <h3 className="truncate max-w-readable">
                                                {kandidat.name}
                                            </h3>
                                        </div>
                                        <p className="truncate text-xs text-gray-500 max-w-readable">{kandidat.nama_partai}</p>
                                    </div>
                                    <div className="flex items-center mt-1">
                                        <div className="flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600">{kandidat.jlh_suara_tps}</div>
                                        <div className="flex justify-center w-4/5 gap-2">
                                            <div className="flex items-center w-4/6">
                                                <div className="overflow-hidden bg-gray-200 h-1.5 rounded-full w-full">
                                                    {(() => {
                                                        if (kandidat.warna == 'merah') {
                                                            return (
                                                                <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'rose') {
                                                            return (
                                                                <span className="h-full bg-rose-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'hijau') {
                                                            return (
                                                                <span className="h-full bg-green-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'orange') {
                                                            return (
                                                                <span className="h-full bg-orange-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'kuning') {
                                                            return (
                                                                <span className="h-full bg-yellow-500 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'biru') {
                                                            return (
                                                                <span className="h-full bg-blue-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'biru-langit') {
                                                            return (
                                                                <span className="h-full bg-sky-500 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'biru-tua') {
                                                            return (
                                                                <span className="h-full bg-blue-800 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else if (kandidat.warna == 'hitam') {
                                                            return (
                                                                <span className="h-full bg-gray-800 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        } else {
                                                            return (
                                                                <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.jlh_suara_tps/model.calontpsuaras_count*100+'%'}` }}></span>
                                                            )
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-2/6 text-lg font-medium text-gray-600">
                                                {kandidat.jlh_suara_tps && model.calontpsuaras_count !== 0 ?
                                                    parseFloat(kandidat.jlh_suara_tps/model.calontpsuaras_count*100).toFixed(2)
                                                : 0 }%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

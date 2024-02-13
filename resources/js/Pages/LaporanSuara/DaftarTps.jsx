import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Panel from '@/Components/Panel';
import { ArrowLeftCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import CardPerDapil from './CardPerDapil';
import PanelKandidat from './PanelKandidat';

export default function DaftarTps(props) {
    const { data: tpsuara, meta } = usePage;
    const { dapil } = usePage().props;
    const [isPanelKandidat, setIsPanelKandidat] = useState(false);
    const [state, setState] = useState([]);

    const kembali = () => {
        window.history.back();
    };

    const openPanelKandidat = (item) => {
        setState(item);
        setIsPanelKandidat(true);
    };
    return (
        <>
            <Panel isOpen={isPanelKandidat} setIsOpen={setIsPanelKandidat}>
                <PanelKandidat model={state} setIsPanelKandidat={setIsPanelKandidat} judul={`Perolahen Suara`} />
            </Panel>
            <div className="space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4">
                <div className="flex items-center justify-between">
                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                        {dapil.nama_dapil}
                    </div>
                    <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-purple-500" /></button>
                </div>
                <hr />
                {tpsuara.length > 0 ?
                <>
                <CardPerDapil/>
                <div className="overflow-x-auto">
                    <div className="mt-4 pb-2 font-bold text-gray-600">Daftar TPS</div>
                    <table className="w-full table-fixed">
                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                            <tr className="text-center font-semibold text-gray-600 border-b">
                                <th style={{width: '4%'}} className="p-3 text-center">
                                    No
                                </th>
                                <th style={{width: '22%'}} className="p-3 text-left">
                                    Kecamatan/Desa
                                </th>
                                <th style={{width: '19%'}} className="p-3 text-left">
                                    Nama TPS
                                </th>
                                <th style={{width: '10%'}} className="p-3 text-center">
                                    Jumlah Pemilih
                                </th>
                                <th style={{width: '10%'}} className="p-3 text-center">
                                    Suara Sah
                                </th>
                                <th style={{width: '10%'}} className="p-3 text-center">
                                    Suara Rusak
                                </th>
                                <th style={{width: '10%'}} className="p-3 text-center">
                                    Sisa Suara
                                </th>
                                <th style={{width: '15%'}} className="p-3 text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-500">
                        {tpsuara.map((item, index) => (
                            <tr key={index} className="border-b border-opacity-20 hover:bg-slate-50">
                                <td className="px-3 py-2 text-center font-medium">
                                {meta.from + index}
                                </td>
                                <td className="px-3 py-2 text-left">
                                    {item.nama_kecamatan}/
                                    <br />
                                    {item.nama_desa}
                                </td>
                                <td className="px-3 py-2 text-left">
                                    {item.nama_tpsuara}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {item.jlh_pemilih}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {item.calontpsuaras_count}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {item.suararusaks_count}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {item.jlh_pemilih-(item.calontpsuaras_count+item.suararusaks_count)}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    <button onClick={() => openPanelKandidat(item)}>
                                        <UsersIcon className="w-4 h-4 inline text-rose-600 -mt-0.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center text-sm pt-6">
                    <Pagination meta={meta} />
                </div>
                </>
                :
                <div className="text-sm text-gray-500 mt-4">Tidak ada TPS di Dapil ini</div>
                }
            </div>
        </>
    );
}
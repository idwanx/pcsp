import App from '@/Layouts/App';
import { useState } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import Panel from '@/Components/Panel';
import SideBar from './SideBar';
import { ArrowLeftCircleIcon, ArrowLongRightIcon, UsersIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import CardTotal from './CardTotal';
import CardPerDapil from './CardPerDapil';
import PanelKandidat from './PanelKandidat';

const NavLinkSide = ({ active = false, className = '', children, ...props }) => {
    return (
      <Link
          {...props}
          className={`tracking-wide group relative flex items-center gap-x-2 rounded-lg p-2 text-sm ${
              active
                  ? 'border-gray-400 text-gray-700 bg-gray-200 focus:text-gray-800 focus:bg-gray-100 focus:border-gray-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-slate-100 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
          } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
      >
          {children}
      </Link>
    );
};


export default function SuaraPemilu(props) {
    const { data: tpsuara, meta } = props.tpsuara;
    const { partai, tahun, pemilu, menupemilu, dapil, suaraperdapils, filterdapil } = usePage().props;
    const [isPanelKandidat, setIsPanelKandidat] = useState(false);
    const [state, setState] = useState([]);

    const daftarDapil =  menupemilu.filter(e => e.id == pemilu.id).flatMap((item) => {
        return item.dapils
    });
    
    const kembali = () => {
        window.history.back();
    };

    const openPanelKandidat = (item) => {
        setState(item);
        setIsPanelKandidat(true);
    };

    Echo.channel('suara-masuk').listen('SuaraMasuk', ({ suaramasuk }) => {
        router.reload();
    });

    return (
        <>
            <Head title="Suara TPS" />
            <Panel isOpen={isPanelKandidat} closeable={true} setIsOpen={setIsPanelKandidat}>
                <PanelKandidat model={state} setIsPanelKandidat={setIsPanelKandidat} judul={`Perolahen Suara`} />
            </Panel>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
                <div className="hidden sm:w-1/5 lg:block md:hidden">
                    <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <SideBar/>
                        <div className="flex">
                            <div className="relative w-full overscroll-auto">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="space-y-2">
                                        <div className="sticky top-0">
                                            <p className="text-md font-semibold text-gray-600">Daftar Dapil</p>
                                        </div>
                                        {daftarDapil?.map((e, i) => {
                                            return (
                                                <NavLinkSide key={i} className="flex items-center text-sm" href={route(route().current(), { partai: partai, tahun: tahun, pemilu: pemilu.id, dapil: e.id })} active={dapil ? dapil.id == e.id : ''}>
                                                    <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" />{e.nama_dapil}
                                                </NavLinkSide>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex lg:gap-6 sm:gap-2 lg:p-0 p-2">
                        <div className="w-full shrink-0 lg:w-2/3 md:w-2/3">
                        <div className="mb-4 focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                            Suara Pemilu {pemilu.nama_pemilu} - {pemilu.tahun}
                        </div>
                        <CardTotal />
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
                                                    Kecamatan/<br />
                                                    Desa
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
                        </div>
                        <div className="hidden md:block lg:w-1/3 md:w-1/3">
                            <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                                <div className="flex">
                                    <div className="relative w-full overscroll-auto">
                                        <div className="relative bg-white py-2 rounded-lg border border-gray-200">
                                            <div className="space-y-1.5">
                                                <div className="sticky top-0 px-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Perolehan Suara</h3>
                                                    <span className="text-sm font-normal text-gray-500">Dari jumlah suara sah {dapil.nama_dapil}</span>
                                                </div>
                                                <hr className="mt-2"/>
                                                <div className="lg:h-[38rem] 2xl:h-[44rem] overflow-x-hidden overflow-y-auto pt-4 px-4">
                                                    <ul role="list" className="divide-y divide-gray-200">
                                                    {suaraperdapils?.map((kandidat, i) => (
                                                    <li key={i} className="flex py-3 items-center">
                                                        {kandidat.foto == null ?
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={`/${kandidat.foto}`} alt="" />
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
                                                            <div className="flex items-center mt-2">
                                                                <div className="flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600">{kandidat.calontpsuaras_count}</div>
                                                                <div className="flex justify-center w-4/5">
                                                                    <div className="flex items-center w-4/6 mr-2.5">
                                                                        <div className="overflow-hidden bg-gray-200 h-1.5 rounded-full w-full">
                                                                            {(() => {
                                                                                if (kandidat.warna == 'merah') {
                                                                                    return (
                                                                                        <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'rose') {
                                                                                    return (
                                                                                        <span className="h-full bg-rose-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'hijau') {
                                                                                    return (
                                                                                        <span className="h-full bg-green-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'orange') {
                                                                                    return (
                                                                                        <span className="h-full bg-orange-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'kuning') {
                                                                                    return (
                                                                                        <span className="h-full bg-yellow-500 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'biru') {
                                                                                    return (
                                                                                        <span className="h-full bg-blue-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'biru-langit') {
                                                                                    return (
                                                                                        <span className="h-full bg-sky-500 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'biru-tua') {
                                                                                    return (
                                                                                        <span className="h-full bg-blue-800 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else if (kandidat.warna == 'hitam') {
                                                                                    return (
                                                                                        <span className="h-full bg-gray-800 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                } else {
                                                                                    return (
                                                                                        <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/filterdapil.suara_sah*100+'%'}` }}></span>
                                                                                    )
                                                                                }
                                                                            })()}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-center w-2/6 text-lg font-medium text-gray-600">
                                                                        {kandidat.calontpsuaras_count && filterdapil.suara_sah !== 0 ?
                                                                            parseFloat(kandidat.calontpsuaras_count/filterdapil.suara_sah*100).toFixed(2)
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
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

SuaraPemilu.layout = page => <App children={page} />
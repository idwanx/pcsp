import App from '@/Layouts/App';
import { useState, useCallback, useEffect} from 'react';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import { Head, usePage, Link, router } from '@inertiajs/react';

import SideBar from './SideBar';
import { ArrowLeftCircleIcon, ArrowLongRightIcon, ArrowPathIcon, UserCircleIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';

import Select from '@/Components/Select';



export default function Rekap() {
    const { partai, tahun, pemilu, filtered, partais, dapils, totalpemilih } = usePage().props;
    
    const [calons, setCalon] = useState([]);
    
    const [state, setState] = useState(null);

    const kembali = () => {
        window.history.back();
    };


    useEffect(() => {
        if(state) {
            async function fetchData() {
                await fetch(route('rekapsuarapartai.getcalonpartai', { partai: state, tahun: tahun, pemilu: pemilu.id, wilayah: filtered ? filtered.wilayah : '' }))
                  .then(response => response.json())
                  .then(data => setCalon(data.datacalon))
              }
              fetchData();
        }
        
    }, [state]);

    const jumlahpemilih = (totalpemilih.reduce((a,v) =>  a = a + v.total_pemilih, 0));

    const [values, setValues] = useState({
        wilayah: filtered.wilayah || '',
    });

    const prevValues = usePrevious(values);

    const reload = useCallback(
        debounce((query) => {
            router.get(route(route().current(), { partai: partai, tahun: tahun, pemilu: pemilu.id }), query, {
                replace: true,
                preserveScroll: true,
                preserveState: true
              });
        }, 500)
    , []);

    useEffect(() => {
        if (prevValues) {
            
          const query = Object.keys(pickBy(values)).length ? pickBy(values) : '';
        reload(query);
        }
      }, [values]);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setValues(values => ({
            ...values,
            [key]: value
        }));

        setCalon([]);
        setState(null);
    }

    const openCalons = (partai) => {
        setState(partai);
    };

    // console.log(filtered.wilayah);

    return (
        <>
            <Head title="Rekap Suara Partai" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
                <div className="hidden sm:w-1/5 lg:block md:hidden">
                    <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <SideBar/>
                    </div>
                </div>
                
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex lg:gap-6 sm:gap-2 lg:p-0 p-2">
                        <div className="w-full shrink-0 lg:w-2/3 md:w-2/3">
                            <div className="space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4">
                                <div className="flex items-center justify-between">
                                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                                        Rekapitulasi Suara Partai
                                    </div>
                                    <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-purple-500" /></button>
                                </div>
                                <hr />
                                <div className="flex items-center pt-4 justify-between w-full">
                                    <div className="relative">
                                        <Select
                                            id="wilayah"
                                            name="wilayah"
                                            className="block w-full"
                                            value={values.wilayah} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Semua Dapil</option>
                                            {dapils.map(dapil => <option key={dapil.id} value={dapil.id}>{dapil.nama_dapil}</option>)}
                                        </Select>
                                    </div>
                                    <div className="flex tems-center text-base text-gray-600">
                                        Total Pemilih: {Number(jumlahpemilih).toLocaleString("id-ID")}
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                                            <tr className="text-center font-semibold text-gray-600 border-b">
                                                <th style={{width: '5%'}} className="p-3 text-center">
                                                    No
                                                </th>
                                                <th style={{width: '45%'}} className="p-3 text-left">
                                                    Nama Partai
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Perolehan Suara
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Persentase
                                                </th>
                                                <th style={{width: '10%'}} className="p-3 text-center">
                                                    Calon
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {partais?.map((partai, index) => (
                                            <tr key={index} className="border-b border-opacity-20 hover:bg-slate-50">
                                                <td className="px-3 py-2 text-center font-medium">
                                                {index + 1}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    <div className="flex min-w-0 gap-x-4 items-center">
                                                        {partai.logo == null ?
                                                            <img className="h-14 w-14 flex-none rounded-md bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :

                                                            <img className="h-14 w-14 flex-none rounded-md bg-gray-50" src={`/storage/${partai.logo}`} alt="" />
                                                        }
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-base text-gray-600 leading-6">{partai.nama_partai}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {partai.jumlah_suara}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {parseFloat(partai.jumlah_suara/jumlahpemilih*100).toFixed(2)}%
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <button onClick={() => openCalons(partai.alias)}>
                                                        <UsersIcon className="w-4 h-4 inline text-gray-600 -mt-0.5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block lg:w-1/3 md:w-1/3">
                            <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                                <div className="flex">
                                    <div className="relative w-full overscroll-auto">
                                        <div className="relative bg-white py-2 rounded-lg border border-gray-200">
                                            <div className="space-y-1.5">
                                                <div className="sticky top-0 px-4">
                                                    <h3 className="text-lg font-medium text-gray-900">Daftar Calon</h3>
                                                </div>
                                                <hr className="mt-2"/>
                                                
                                                <div className="lg:h-[34rem] 2xl:h-[44rem] overflow-x-hidden overflow-y-auto pt-4 px-4">
                                                    <ul role="list" className="divide-y divide-gray-200">
                                                    {calons.length > 0 ? calons.map((kandidat, i) => (
                                                        <li key={i} className="flex py-3 items-center">
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
                                                                <div className="flex items-center mt-2">
                                                                    <div className="flex justify-center w-1/5 text-lg font-medium mr-0.5 text-gray-600">{kandidat.calontpsuaras_count}</div>
                                                                    <div className="flex justify-center w-4/5">
                                                                        <div className="flex items-center w-4/6 mr-2.5">
                                                                            <div className="overflow-hidden bg-gray-200 h-1.5 rounded-full w-full">
                                                                                {(() => {
                                                                                    if (kandidat.warna == 'merah') {
                                                                                        return (
                                                                                            <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'rose') {
                                                                                        return (
                                                                                            <span className="h-full bg-rose-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'hijau') {
                                                                                        return (
                                                                                            <span className="h-full bg-green-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'orange') {
                                                                                        return (
                                                                                            <span className="h-full bg-orange-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'kuning') {
                                                                                        return (
                                                                                            <span className="h-full bg-yellow-500 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'biru') {
                                                                                        return (
                                                                                            <span className="h-full bg-blue-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'biru-langit') {
                                                                                        return (
                                                                                            <span className="h-full bg-sky-500 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'biru-tua') {
                                                                                        return (
                                                                                            <span className="h-full bg-blue-800 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else if (kandidat.warna == 'hitam') {
                                                                                        return (
                                                                                            <span className="h-full bg-gray-800 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    } else {
                                                                                        return (
                                                                                            <span className="h-full bg-red-600 w-full block rounded-full" style={{ width: `${kandidat.calontpsuaras_count/jumlahpemilih*100+'%'}` }}></span>
                                                                                        )
                                                                                    }
                                                                                })()}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-center w-2/6 text-lg font-medium text-gray-600">
                                                                            {kandidat.calontpsuaras_count && jumlahpemilih !== 0 ?
                                                                                parseFloat(kandidat.calontpsuaras_count/jumlahpemilih*100).toFixed(2)
                                                                            : 0 }%
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                    : <div>Silahkan klik ikon <UsersIcon className="w-4 h-4 inline text-gray-600 -mt-0.5" /> pada tabel untuk melihat calon.</div>
                                                    }
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

Rekap.layout = page => <App children={page} />
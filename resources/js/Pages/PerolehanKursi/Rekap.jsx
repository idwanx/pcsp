import App from '@/Layouts/App';
import { useState, useCallback, useEffect} from 'react';
import { debounce, pickBy } from 'lodash';
import { usePrevious } from 'react-use';
import { Head, usePage, Link, router } from '@inertiajs/react';
import SideBar from './SideBar';
import { ArrowLeftCircleIcon, ArrowLongRightIcon, ArrowPathIcon, ArrowRightIcon, UserCircleIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline';
import Select from '@/Components/Select';

export default function Rekap() {
    const { partai, tahun, pemilu, filtered, partais, dapils, hasil } = usePage().props;

    const kembali = () => {
        window.history.back();
    };

    const flatmapdata = hasil?.flatMap((suara) => 
        [suara.n1,suara.n3,suara.n5,suara.n7,suara.n9,suara.n11]
    );

    const ranking = flatmapdata?.sort((a, b) => b.nilai - a.nilai );
    
    const slicedata = ranking?.slice(0,6);


    const groupedData = slicedata?.reduce((groups, item) => {
        const { partai } = item;
        if (!groups[partai]) {
            groups[partai] = [];
        }
        groups[partai].push({logo:item.logo, calonpartai:item.calons});
        return groups;
    }, {});

    const total = (partais.reduce((a,v) =>  a = a + v.jumlah_suara + v.suara_partai, 0));

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

    return (
        <>
            <Head title="Perolehan Kursi" />
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-6">
                <div className="hidden sm:w-1/5 lg:block md:hidden">
                    <div className="space-y-4 -mt-12 pt-12 lg:sticky lg:top-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        <SideBar/>
                    </div>
                </div>
                
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex lg:gap-6 sm:gap-2 lg:p-0 p-2">
                        <div className="w-full shrink-0">
                            <div className="space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4">
                                <div className="flex items-center justify-between">
                                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                                       Perolehan Kursi Partai
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
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                                            <tr className="text-center font-semibold text-gray-600 border-b">
                                                <th style={{width: '10%'}} className="p-3 text-center">
                                                    No
                                                </th>
                                                <th style={{width: '75%'}} className="p-3 text-left">
                                                    Nama Partai / Calon
                                                </th>
                                                <th style={{width: '15%'}} className="p-3 text-center">
                                                    Jumlah Kursi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {hasil.length > 0 && total > 0 ? Object.entries(groupedData)?.map(([category, items], i) => (

                                            <tr key={category} className="border-b border-opacity-20 hover:bg-slate-50 align-top">
                                                <td className="px-3 py-2 text-center font-medium">
                                                    {i+1}
                                                </td>
                                                <td className="px-3 py-2 border-l border-opacity-20 text-left">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        {items?.[0] == null ?
                                                            <img className="h-14 w-14 flex-none rounded-md bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :

                                                            <img className="h-14 w-14 flex-none rounded-md bg-gray-50" src={`/storage/${items[0].logo}`} alt="" />
                                                        }
                                                        <div className="w-full">
                                                            <div className="min-w-0 flex-auto">
                                                                <p className="text-base text-gray-600">{category}</p>
                                                            </div>
                                                            
                                                            <div className="min-w-0 flex-auto pt-4">
                                                            <p className="text-ms text-rose-600">Calon dengan suara terbanyak:</p>
                                                                <ul role="list" className="divide-y divide-gray-200">
                                                                {items?.[0].calonpartai.slice(0,items.length).map((terpilih, i) => (
                                                                    <li key={i} className="flex py-2 items-center">
                                                                        {terpilih.foto == null ?
                                                                            <UserCircleIcon className="w-12 h-12 stroke-gray-400 stroke-1 inline -mt-0.5" />
                                                                        :
                                                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`/storage/${terpilih.foto}`} alt="" />
                                                                        }
                                                                        <div className="ml-4 flex flex-1 flex-col min-w-0">
                                                                            <div className='min-w-0 flex-auto'>
                                                                                <div className="flex justify-between text-md font-medium text-gray-600">
                                                                                    <h3 className="truncate max-w-readable">
                                                                                        {terpilih.user.name}
                                                                                    </h3>
                                                                                </div>
                                                                                <p className="truncate text-xs text-gray-500 max-w-readable">Perolehan Suara: {terpilih.calontpsuaras_count}</p>
                                                                            </div>
                                                                            
                                                                        </div>
                                                                    </li>
                                                                 ))}
                                                                </ul>
                                                            
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* {items?.[0].calonpartai.slice(0,items.length).map((terpilih, i) => (
                                                    <div className="flex min-w-0 gap-x-4 pt-6 items-center">
                                                        <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-base text-gray-600 leading-6">{terpilih.user.name} - {terpilih.calontpsuaras_count}</p>
                                                        </div>
                                                    </div>
                                                    ))} */}
                                                    
                                                </td>
                                                <td className="px-3 py-2 text-center border-l border-opacity-20">
                                                    {items.length} Kursi
                                                </td>
                                            </tr>
                                            ))
                                        : 
                                        <tr>
                                            <td colSpan={2} className="py-6">Silahkan pilih dapil untuk melihat perolehan kursi partai.</td>
                                        </tr>
                                        }
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar */}
                    </div>
                </div>
            </div>
        </>
    );
}

Rekap.layout = page => <App children={page} />
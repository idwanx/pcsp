import App from '@/Layouts/App';
import { useState, useEffect } from 'react';
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SideBar from './SideBar';
import { ExclamationTriangleIcon, ArrowDownTrayIcon, CheckIcon, ArrowLeftCircleIcon, ArrowLongRightIcon, ArrowUpTrayIcon, MagnifyingGlassIcon, PaperClipIcon, PencilSquareIcon, PlusIcon, TrashIcon, UsersIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import Pagination from '@/Components/Pagination';
import LaporForm from './LaporForm';
import ButtonIcon from '@/Components/ButtonIcon';
import UploadDokumen from './UploadDokumen';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

const NavLinkSide = ({ active = false, className = '', children, ...props }) => {
    return (
      <Link
          {...props}
          className={`tracking-wide group relative flex gap-x-2 rounded-lg p-2 text-sm ${
              active
                  ? 'border-gray-400 text-gray-700 bg-gray-200 focus:text-gray-800 focus:bg-gray-100 focus:border-gray-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
          } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
      >
          {children}
      </Link>
    );
};

const ButtonLinkSide = ({ active = false, className = '', children, ...props }) => {
    return (
      <button
          {...props}
          className={`tracking-wide group relative flex gap-x-2 rounded-lg p-2 text-sm ${
              active
                  ? 'w-full border-gray-400 text-gray-700 bg-gray-200 focus:text-gray-800 focus:bg-gray-200 focus:border-gray-700'
                  : 'w-full border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
          } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
      >
          {children}
      </button>
    );
};

export default function SuaraPemilu(props) {
    const { data: tpsuara, meta } = props.tpsuara;
    const { partai, tahun, dapil, menudapil, pemilu } = usePage().props;
    const [state, setState] = useState([]);
    const [kandidats, setKandidat] = useState([]);
    const [tps, setTps] = useState('');
    const [isLaporForm, setIsLaporForm] = useState(false);
    const [formUpload, setFormUpload] = useState(false);
    const [isDestroy, setIsDestroy] = useState(false);

    const { data, setData, post, processing } = useForm({
        tpsuara_id: '',
        suara_rusak: '',
    });

    const dokumen =  tpsuara.filter(e => e.id == tps.id).flatMap((item) => {
        return item.dokumentpsuaras;
    });

    const getCalon = async () => {
        try {
            const response = await fetch(route('laporsuara.kandidat', { partai: partai, dapil: dapil.id, tpsuara: tps.id }));
            const dataCalons = await response.json();
            setKandidat(dataCalons.dataKandidat);
        } catch (err) {
            console.log("error", err);
        }
    };

    useEffect(() => {
        if(tps.id) {
            getCalon();
        }
    }, [tps.id]);

    // useEffect(() => {
    //     if(tps.id) {
    //         async function fetchData() {
    //             await fetch(route('laporsuara.kandidat', { dapil: dapil.id, tpsuara: tps.id }))
    //               .then(response => response.json())
    //               .then(data => setKandidat(data.dataKandidat))
    //           }
    //         fetchData();
    //     }
    // }, [tps.id]);

    const kembali = () => {
        window.history.back();
    };

    const openLaporForm = (item) => {
        setState(item);
        setIsLaporForm(true);
    };

    const closeLaporForm = () => {
        getCalon();
        setIsLaporForm(false);
    };


    const openFormUpload = () => {
        setFormUpload(true);
    };

    const closeFormUpload = () => {
        setFormUpload(false);
    };

    const destroyDokumen = (dok) => {
        setState(dok);
        setIsDestroy(true);
    };

    const closeDestroy = () => {
        setIsDestroy(false);
    };

    const destroyHandler = () => {
        router.delete(route('laporsuara.destroydokumen', { partai: partai, tahun: tahun, dokumentpsuara: state.id }), { 
            preserveScroll: true,
            onSuccess: () => {
                closeDestroy();
            },
        });
    };

    const storeSuaraRusak = (e) => {
        e.preventDefault();
        post(route('laporsuara.storesuararusak', { partai: partai, tahun: tahun, tpsuara: tps.id }), {
            preserveScroll: true
        });
    };

    const changeTps = (item) => {
        setTps(item);
        setData({...data, tpsuara_id: item.id, suara_rusak: item.suararusaks_count})
    };

    return (
        <>
            <Head title="Suara TPS" />
            <Modal isOpen={formUpload} closeable={false} onClose={closeFormUpload} size={`sm`}>
                <UploadDokumen model={tps.id} isClose={closeFormUpload} submitLabel={`Upload`} title={`Upload Dokumen`} />
            </Modal>
            <Modal isOpen={isLaporForm} closeable={false} onClose={closeLaporForm} size={`sm`}>
                <LaporForm model={state} dataTps={tps} isClose={closeLaporForm} submitLabel={`Kirim`} title={`Lapor Suara`} />
            </Modal>

            <Modal isOpen={isDestroy}  closeable={true} onClose={closeDestroy} size={`sm`}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-lg font-medium text-gray-900">
                            Konfirmasi
                        </h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Apakah anda yakin <span className='text-red-500'>{state.keterangan}</span> akan dihapus?
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-slate-100 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <DangerButton onClick={destroyHandler}>
                        Hapus
                    </DangerButton>
                    <SecondaryButton onClick={closeDestroy}>Batal</SecondaryButton>
                </div>
            </Modal>

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
                                        {menudapil?.map((e, i) => {
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
                        <div className="flex">
                            <div className="relative w-full overscroll-auto">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <div className="space-y-2">
                                        <div className="sticky top-0">
                                            <p className="text-md font-semibold text-gray-600">Daftar TPS</p>
                                        </div>
                                        {tpsuara?.map((e, i) => {
                                            return (
                                                <ButtonLinkSide key={i} onClick={() => changeTps(e)} className="flex items-start text-sm" active={tps ? e.id == tps.id : ''}>
                                                    <ArrowLongRightIcon className="h-5 w-5" aria-hidden="true" /><span className="truncate max-w-readable">{e.nama_tpsuara}</span>
                                                </ButtonLinkSide>
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
                            <div className="space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4">
                                <div className="flex items-center justify-between">
                                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                                        Lapor Perolehan Suara
                                    </div>
                                    <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-gray-500" /></button>
                                </div>
                                <hr />
                                <div className="overflow-x-auto">
                                    <div className="mt-4 pb-2 font-bold text-gray-600">
                                        Perolehan Suara {dapil.nama_dapil} {tps.nama_tpsuara}
                                        <p>{pemilu.nama_pemilu} - {pemilu.tahun}</p>
                                    </div>
                                    <table className="w-full table-fixed">
                                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                                            <tr className="text-center font-semibold text-gray-600 border-b">
                                                <th style={{width: '5%'}} className="p-3 text-center">
                                                    No
                                                </th>
                                                <th style={{width: '55%'}} className="p-3 text-left">
                                                    Nama
                                                </th>
                                                <th style={{width: '25%'}} className="p-3 text-center">
                                                    Perolehan Suara
                                                </th>
                                                <th style={{width: '15%'}} className="p-3 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {kandidats?.map((item, index) => (
                                            <tr key={index} className="border-b border-opacity-20 hover:bg-slate-50">
                                                <td className="px-3 py-2 text-center font-medium">
                                                    {meta.from + index}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    <div className="flex min-w-0 gap-x-4 items-center">
                                                        {item?.foto == null ?
                                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :
                                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={`/${item.foto}`} alt="" />
                                                        }
                                                        <div className="min-w-0 flex-auto">
                                                        <p className="text-base font-semibold leading-6">{item.name}</p>
                                                        <p>{item.nama_partai}</p>
                                                        <p>No. Urut : {item.no_urut}</p>
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {item.calontpsuaras == null ? 'belum terlapor' : item.calontpsuaras.jlh_suara_tps}
                                                </td>
                                                <td className="px-3 py-2">
                                                    <div className="flex items-center justify-center">
                                                        {item.calontpsuaras === null || item.calontpsuaras?.is_verified_at === null ?
                                                            <button onClick={() => openLaporForm(item)}>
                                                                <PencilSquareIcon className="w-4 h-4 inline text-gray-600 -mt-0.5" />
                                                            </button>
                                                        : <CheckIcon className="h-4 w-4 text-green-500" />
                                                        }
                                                    </div>
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
                                                    <h3 className="text-lg font-medium text-gray-900">Data TPS</h3>
                                                    {/* <span className="text-sm font-normal text-gray-500">Dari jumlah suara sah {dapil.nama_dapil}</span> */}
                                                </div>
                                                <hr className="mt-2"/>
                                                
                                                <div className="2xl:h-[44rem] lg:h-[34rem] md:h-[28rem] overflow-x-hidden overflow-y-auto px-4">
                                                    <div className="mt-1">
                                                        <dl className="divide-y divide-gray-100">
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Nama TPS</div>
                                                                <div className="text-sm col-span-2 leading-6 text-gray-700">{tps.nama_tpsuara}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Desa</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps.nama_desa}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Kecamatan</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps.nama_kecamatan}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Jlh. Pemilih</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps.jlh_pemilih}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Suara Sah</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps.calontpsuaras_count}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Suara Rusak</div>
                                                                {tps ? 
                                                                    <form onSubmit={storeSuaraRusak} className="flex col-span-2 mt-1 gap-2 items-center justify-between">
                                                                            <TextInput
                                                                                id="suara_rusak"
                                                                                type="number"
                                                                                name="suara_rusak"
                                                                                value={data.suara_rusak}
                                                                                className="block w-full"
                                                                                autoComplete="suara_rusak"
                                                                                onChange={(e) => setData('suara_rusak', e.target.value)}
                                                                            />
                                                                        
                                                                            <span>
                                                                                <ButtonIcon 
                                                                                    disabled={processing}
                                                                                >
                                                                                    <span>Kirim</span>
                                                                                </ButtonIcon>
                                                                            </span>
                                                                    </form>
                                                                : ''
                                                                }
                                                            </div>
                                                        </dl>
                                                    </div>
                                                    
                                                    {tps ?
                                                    <div className="py-8 space-y-4">
                                                        <div className="flex items-center justify-between">
                                                            <span>Dokumen</span>
                                                            <span>
                                                                <ButtonIcon 
                                                                    onClick={openFormUpload}
                                                                >
                                                                    <ArrowUpTrayIcon className="hidden sm:block h-5 w-5 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" />
                                                                    <span className="sm:hidden xs:block">Tambah</span>
                                                                </ButtonIcon>
                                                            </span>
                                                            
                                                        </div>
                                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                {dokumen?.map((dok, i) => (
                                                                    <li key={i} className="flex items-center justify-between p-2 text-sm leading-6">
                                                                        <div className="flex w-0 flex-1 items-center">
                                                                            <PaperClipIcon className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                                            <div className="ml-1 flex min-w-0 flex-1 gap-2">
                                                                            <span className="truncate font-medium">{dok.keterangan}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ml-2 flex-shrink-0 space-x-2">
                                                                            <a
                                                                                className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-gray-300 transition ease-in-out duration-150"
                                                                                href={route('laporsuara.downloaddokumen', { partai: partai.alias, tahun: tahun, dokumentpsuara: dok.id })} target="_blank"
                                                                                >
                                                                                <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" />
                                                                            </a>
                                                                            <button
                                                                                type="button"
                                                                                className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-gray-300 transition ease-in-out duration-150"
                                                                                onClick={() => destroyDokumen(dok)}
                                                                                >
                                                                                <TrashIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" />
                                                                            </button>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                                
                                                                
                                                            </ul>
                                                        </dd>
                                                    </div>
                                                    : ''
                                                    }

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
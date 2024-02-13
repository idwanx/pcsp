import App from '@/Layouts/App';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import { ArrowLeftCircleIcon, ArrowLongRightIcon, ExclamationTriangleIcon, PaperClipIcon, MagnifyingGlassIcon, TrashIcon, PencilSquareIcon, CheckIcon } from '@heroicons/react/24/outline';
import UpdateSuaraForm from './UpdateSuaraForm';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import ButtonIcon from '@/Components/ButtonIcon';
import TextInput from '@/Components/TextInput';

const NavLinkSide = ({ active = false, className = '', children, ...props }) => {
    return (
      <Link
          {...props}
          className={`tracking-wide group relative flex items-center gap-x-2 rounded-lg py-1.5 px-2 text-sm ${
              active
                  ? 'border-gray-400 text-gray-700 bg-gray-200 focus:text-gray-800 focus:bg-gray-100 focus:border-gray-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
          } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
      >
          {children}
      </Link>
    );
};


export default function Index() {
    const { partai, tahun, menutps, tps, pemilu } = usePage().props;
    
    const [state, setState] = useState('');

    const caleg = pemilu?.map(item => item.dapil_tpsuaras).flatMap(e => {
        return e.calontpsuaras;
    });

    const [isDestroy, setIsDestroy] = useState(false);

    const [updateSuaraForm, setUpdateSuaraForm] = useState(false);

    const { data, setData, put, processing } = useForm({
        suara_rusak: tps?.suara_rusak || '',
    });


    const destroyDokumen = (dok) => {
        setState(dok);
        setIsDestroy(true);
    };

    const closeDestroy = () => {
        setIsDestroy(false);
    };

    const destroyHandler = () => {
        router.delete(route('suaramasuk.destroydokumen', { partai: partai, tahun: tahun, dokumentpsuara: state.id }), { 
            preserveScroll: true,
            onSuccess: () => {
                closeDestroy();
            },
        });
    };

    const updateSuaraRusak = (e) => {
        e.preventDefault();
        put(route('suaramasuk.updatesuararusak', { partai: partai, tahun: tahun, suararusak: tps?.suararusak_id }), {
            preserveScroll: true
        });
    };

    const openUpdateSuaraForm = (item) => {
        setState(item);
        setUpdateSuaraForm(true);
    };

    const closeUpdateSuaraForm = () => {
        setUpdateSuaraForm(false);
    };

    Echo.channel('suara-masuk').listen('SuaraMasuk', () => {
        router.reload();
    });

    return (
        <>
            <Head title="Suara Masuk" />

            <Modal isOpen={updateSuaraForm} closeable={false} onClose={closeUpdateSuaraForm} size={`sm`}>
                <UpdateSuaraForm model={state} isClose={closeUpdateSuaraForm} submitLabel={`Kirim`} title={`Lapor Suara`} />
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

                        <div className="flex flex-shrink-0 flex-col">
                            <div className="relative w-full overscroll-auto">
                                <div className="relative bg-white py-2 rounded-lg border border-gray-200">
                                    <div className="space-y-2">
                                        <div className="sticky top-0 px-4">
                                            <h3 className="text-lg font-medium text-gray-900">Suara Masuk</h3>
                                        </div>
                                        <div className="lg:h-[34rem] 2xl:h-[44rem] overflow-x-hidden overflow-y-auto px-4">
                                            {menutps?.map((e, i) => (
                                                <NavLinkSide key={i} className="flex justify-between mt-2 items-start text-sm" href={route('suaramasuk.listsuara', { partai: partai, tahun: tahun, tpsuara: e.id })} active={tps ? tps.id == e.id : ''}>
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="truncate text-sm font-semibold text-gray-600 max-w-readable">{e?.nama_tpsuara}</p>
                                                        <p className="truncate text-xs text-gray-500 max-w-readable">Suara: {e?.nama_pemilu}</p>
                                                    </div>
                                                    <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-0.5 text-sm font-semibold text-white ring-1 ring-inset ring-green-600/20">
                                                        {e.jlh_suara_masuk}
                                                    </span>
                                                </NavLinkSide>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                </div>
                
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex lg:gap-6 sm:gap-2 lg:p-0 p-2">
                        <div className="w-full shrink-0 lg:w-2/3 md:w-2/3">
                            <div className="space-y-2 bg-white shadow-sm sm:rounded-lg text-sm py-2 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                                        Verfikasi Suara
                                    </div>
                                    {/* <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-gray-500" /></button> */}
                                </div>
                                <hr />
                                <div className="pt-4 font-bold text-gray-600">Suara Pemilu {pemilu?.[0].nama_pemilu}</div>
                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                                            <tr className="text-center font-semibold text-gray-600 border-b">
                                                <th style={{width: '7%'}} className="p-3 text-center">
                                                    No
                                                </th>
                                                <th style={{width: '53%'}} className="p-3 text-left">
                                                    Nama
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Jumlah Suara
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {caleg?.map((item, i) => (
                                            <tr key={i} className="border-b border-opacity-20 hover:bg-slate-50">
                                                <td className="px-3 py-2 text-center font-medium">
                                                    -
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        {item.calon.foto == null ?
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={`/${item.calon.foto}`} alt="" />
                                                        }
                                                        <div className="min-w-0 flex-auto">
                                                            <p className="text-base text-gray-700">{item.calon.user.name}</p>
                                                            <p className="text-xs text-gray-500">{item.calon.partai.nama_partai}</p>
                                                            <p className="text-xs text-gray-500">No. Urut: {item.calon.no_urut}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {item.jlh_suara_tps}
                                                </td>
                                                <td className="px-3 py-2 text-center items-center">
                                                    <div className="ml-2 flex-shrink-0 justify-between space-x-2">
                                                        <button
                                                            type="button"
                                                            className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-gray-300 transition ease-in-out duration-150"
                                                            onClick={() => openUpdateSuaraForm(item)}
                                                            >
                                                            <PencilSquareIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" />
                                                        </button>
                                                        <Link href={route('suaramasuk.approvesuara', { partai: partai, tahun: tahun, calonTpsuara: item.id })} className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-gray-50 focus:ring-gray-300 transition ease-in-out duration-150" preserveScroll>
                                                            <CheckIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500" />
                                                        </Link>
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
                                                </div>
                                                <hr className="mt-2"/>
                                                
                                                <div className="2xl:h-[44rem] lg:h-[34rem] md:h-[28rem] overflow-x-hidden overflow-y-auto px-4">
                                                    <div className="mt-1">
                                                        <dl className="divide-y divide-gray-100">
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Nama TPS</div>
                                                                <div className="text-sm col-span-2 leading-6 text-gray-700">{tps?.nama_tpsuara}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Desa</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps?.nama_desa}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Kecamatan</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps?.nama_kecamatan}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Jlh. Pemilih</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps?.jlh_pemilih}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Suara Sah</div>
                                                                <div className="text-sm leading-6 text-gray-700">{tps?.suara_sah}</div>
                                                            </div>
                                                            <div className="grid grid-cols-3 py-0.5 items-center">
                                                                <div className="text-sm font-medium leading-6 text-gray-900">Suara Rusak</div>
                                                                {tps && tps?.suara_rusak !== null ? 
                                                                    <form onSubmit={updateSuaraRusak} className="flex col-span-2 mt-1 gap-2 items-center justify-between">
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
                                                                                    <span>Approve</span>
                                                                                </ButtonIcon>
                                                                            </span>
                                                                    </form>
                                                                : '-'
                                                                }
                                                            </div>
                                                        </dl>
                                                    </div>
                                                   <div className="px-4 py-6 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0">
                                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                                
                                                                {tps?.dokumentpsuaras.map((dok, i) => (
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
                                                                                href={route('suaramasuk.downloaddokumen', { partai: partai.alias, tahun: tahun, dokumentpsuara: dok.id })} target="_blank"
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

Index.layout = page => <App children={page} />
import App from '@/Layouts/App';
import { useState } from 'react';
import { Head, usePage, Link, router, useForm } from '@inertiajs/react';
import SideBar from './SideBar';
import {
    ArrowLeftCircleIcon,
    ExclamationTriangleIcon,
    PencilSquareIcon,
    TrashIcon,
  } from '@heroicons/react/24/outline';
  import { PlusIcon } from '@heroicons/react/24/solid';
import Pagination from '@/Components/Pagination';
import ButtonIcon from '@/Components/ButtonIcon';
import Modal from '@/Components/Modal';
import PemiluForm from './PemiluForm';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Pemilu(props) {
    const { data: pemilu, meta } = props.pemilu;

    const [state, setState] = useState([]);
    
    const [isFormAdd, setIsFormAdd] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);
    const [isDestroy, setIsDestroy] = useState(false);
    
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nama_pemilu: '',
        tahun: '',
        icon: '',
    });

    const openFormAdd = () => {
        setIsFormAdd(true);
        reset();
    };

    const closeFormAdd = () => {
        setIsFormAdd(false);
        clearErrors();
    };

    const openFormUpdate = (item) => {
        setData(item);
        setIsFormUpdate(true);
    };

    const closeFormUpdate = () => {
        setIsFormUpdate(false);
        clearErrors();
    };

    const openDestroy = (item) => {
        setState(item);
        setIsDestroy(true);
    };

    const closeDestroy = () => {
        setIsDestroy(false);
    };

    const storeHandler = (e) => {
        e.preventDefault();
        post(route('datapemilu.storepemilu'), {
            preserveScroll: true,
            onSuccess: () => {
                closeFormAdd();
            },
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();
        put(route('datapemilu.updatepemilu', data.id), {
            preserveScroll: true,
            onSuccess: () => {
                closeFormUpdate();
            },
        });
    };

    const destroyHandler = () => {
        router.delete(route('datapemilu.destroypemilu', state.id), { 
            preserveScroll: true,
            onSuccess: () => {
                closeDestroy();
            },
        });
    };

    const kembali = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Pemilu" />
            <Modal isOpen={isFormAdd} closeable={false} onClose={closeFormAdd} size={`sm`}>
                <PemiluForm isClose={closeFormAdd} data={data} setData={setData} errors={errors} processing={processing} submit={storeHandler} submitLabel={`Tambah`} title={`Tambah Pemilu`} />
            </Modal>
            <Modal isOpen={isFormUpdate} closeable={false} onClose={closeFormUpdate} size={`sm`}>
                <PemiluForm isClose={closeFormUpdate} data={data} setData={setData} errors={errors} processing={processing} submit={updateHandler} submitLabel={`Update`} title={`Update Pemilu`} />
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
                            Apakah anda yakin <span className='text-red-500'>{state.nama_jenjang}</span> akan dihapus?
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
                
                <SideBar/>
                <div className="w-full lg:w-4/5 sm:w-full">
                    <div className="flex lg:gap-6 sm:gap-2 lg:p-0 p-2">
                        <div className="w-full shrink-0">
                            <div className="space-y-3 bg-white shadow-sm sm:rounded-lg text-sm p-4">
                                <div className="flex items-center justify-between">
                                    <div className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-xl font-bold leading-normal text-gray-600">
                                        Data Pemilu
                                    </div>
                                    <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-purple-500" /></button>
                                </div>
                                <hr />

                                <div className="flex flex-col sm:flex-row lg:items-center pt-2 justify-end">
                                    <ButtonIcon 
                                        onClick={openFormAdd}
                                        // onClick={() => openFormAdd()}
                                    >
                                        <PlusIcon className="hidden sm:block h-5 w-5 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500" />
                                        <span className="sm:hidden xs:block">Tambah</span>
                                    </ButtonIcon>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead className="uppercase text-xs rounded-t-lg bg-gray-100">
                                            <tr className="text-center font-semibold text-gray-600 border-b">
                                                <th style={{width: '10%'}} className="p-3 text-center">
                                                    No
                                                </th>
                                                <th style={{width: '40%'}} className="p-3 text-left">
                                                    Nama Pemilu
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Tahun
                                                </th>
                                                <th style={{width: '10%'}} className="p-3 text-left">
                                                    Icon
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {pemilu.map((item, index) => (
                                            <tr key={index} className="border-b border-opacity-20 hover:bg-slate-50">
                                                <td className="px-3 py-2 text-center font-medium">
                                                {meta.from + index}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {item.nama_pemilu}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    {item.tahun}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    {item.icon}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                    <div className="flex gap-1 w-full justify-center">
                                                        <button
                                                            type="button"
                                                            className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-purple-50 focus:ring-purple-300 transition ease-in-out duration-150"
                                                            onClick={() => openFormUpdate(item)}
                                                            >
                                                            <PencilSquareIcon className="h-4 w-4 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="group inline-flex justify-center rounded-md px-1 py-1 text-sm font-medium hover:ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:bg-purple-50 focus:ring-purple-300 transition ease-in-out duration-150"
                                                            onClick={() => openDestroy(item)}
                                                            >
                                                            <TrashIcon className="h-4 w-4 text-gray-400 group-hover:text-purple-500 group-focus:text-purple-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center text-sm pt-6">
                                    <Pagination meta={meta} />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

Pemilu.layout = page => <App children={page} />
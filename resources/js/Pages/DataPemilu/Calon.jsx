import App from '@/Layouts/App';
import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
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
import CalonForm from './CalonForm';
import DangerButton from '@/Components/DangerButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SideBar from './SideBar';

export default function Calon(props) {
    const { data: calons, meta } = props.calons;
    const [state, setState] = useState([]);
    
    const [isFormAdd, setIsFormAdd] = useState(false);
    const [isFormUpdate, setIsFormUpdate] = useState(false);
    const [isDestroy, setIsDestroy] = useState(false);

    const openFormAdd = (item) => {
        setState(item)
        setIsFormAdd(true);
    };

    const closeFormAdd = () => {
        setIsFormAdd(false);
    };

    const openFormUpdate = (item) => {
        setState(item)
        setIsFormUpdate(true);
    };

    const closeFormUpdate = () => {
        setIsFormUpdate(false);
    };

    const openDestroy = (item) => {
        setState(item);
        setIsDestroy(true);
    };

    const closeDestroy = () => {
        setIsDestroy(false);
    };

    const destroyHandler = () => {
        router.delete(route('datapemilu.destroycalon', state.id), { 
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
            <Modal isOpen={isFormAdd} closeable={false} onClose={closeFormAdd} size={`md`}>
                <CalonForm isClose={closeFormAdd} model={state} submitLabel={`Tambah`} title={`Tambah Calon`} />
            </Modal>
            <Modal isOpen={isFormUpdate} closeable={false} onClose={closeFormUpdate} size={`md`}>
                <CalonForm isClose={closeFormUpdate} model={state} submitLabel={`Update`} title={`Update Calon`} />
            </Modal>

            {/* <Modal isOpen={isFormAdd} closeable={false} onClose={closeFormAdd} size={`md`}>
                <CalonForm isClose={closeFormAdd} data={data} setData={setData} errors={errors} processing={processing} submit={storeHandler} submitLabel={`Tambah`} title={`Tambah Calon`} />
            </Modal>
            <Modal isOpen={isFormUpdate} closeable={false} onClose={closeFormUpdate} size={`md`}>
                <CalonForm isClose={closeFormUpdate} data={data} setData={setData} errors={errors} processing={processing} submit={updateHandler} submitLabel={`Update`} title={`Update Calon`} />
            </Modal> */}
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
                            Apakah anda yakin <span className='text-red-500'>{state.name}</span> akan dihapus?
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
                                        Data Dapil
                                    </div>
                                    <button type="button" onClick={() => kembali()}><ArrowLeftCircleIcon className="w-7 h-7 text-gray-400 hover:text-purple-500" /></button>
                                </div>
                                <hr />

                                <div className="flex flex-col sm:flex-row lg:items-center pt-2 justify-end">
                                    <ButtonIcon 
                                        onClick={openFormAdd}
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
                                                <th style={{width: '25%'}} className="p-3 text-left">
                                                    Nama Calon
                                                </th>
                                                <th style={{width: '25%'}} className="p-3 text-left">
                                                    No. Urut
                                                </th>
                                                <th style={{width: '25%'}} className="p-3 text-left">
                                                    Nama Partai
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Nama Dapil
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Nama Pemilu
                                                </th>
                                                <th style={{width: '20%'}} className="p-3 text-center">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-500">
                                        {calons.map((item, index) => (
                                            <tr key={index} className="border-b border-opacity-20 hover:bg-slate-50">
                                                <td className="px-3 py-2 text-center font-medium">
                                                {meta.from + index}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                    <div className="flex min-w-0 gap-x-4">
                                                        {item.foto == null ?
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src="/images/no-camera.png" alt="" />
                                                        :
                                                            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={`/${item.foto}`} alt="" />
                                                        }
                                                        <div className="min-w-0 flex-auto">
                                                        <p className="text-sm leading-6">{item.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                {item.no_urut}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                {item.nama_partai}
                                                </td>
                                                <td className="px-3 py-2 text-left">
                                                {item.nama_dapil}
                                                </td>
                                                <td className="px-3 py-2 text-center">
                                                {item.nama_pemilu} {item.tahun}
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

Calon.layout = page => <App children={page} />
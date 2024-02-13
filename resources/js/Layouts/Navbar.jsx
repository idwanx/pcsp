import { Fragment, useState, useEffect } from 'react';
import { Disclosure, Menu, Dialog, Transition } from '@headlessui/react';
import NavLink from '@/Components/NavLink';
import { Link, usePage, router } from '@inertiajs/react';
import {
    UserIcon,
    UserCircleIcon,
    Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon, KeyIcon
  } from '@heroicons/react/24/outline';
 
const NavLinkSide = ({ active = false, className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={`w-full flex items-start pl-3 pr-4 py-1 border-l-4 text-sm ${
                active
                    ? 'border-gray-400 text-gray-700 bg-gray-100 focus:text-gray-800 focus:bg-gray-100 focus:border-gray-700'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
};

export default function Navbar() {
    const { auth, partai, tahun, jumlah_suara_global } = usePage().props;
    const [open, setOpen] = useState(false);

    const suaraGlobal = (jumlah_suara_global.reduce((a,v) =>  a = a + v.jlh_suara_masuk, 0));

    Echo.channel('suara-masuk').listen('SuaraMasuk', ({ suaramasuk }) => {
        router.reload();
        console.log(suaramasuk);
    });

    
    
    return (
        <header className="sticky top-0 z-10">
            <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
                <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                    <div className="flex px-4 pb-2 pt-5">
                        <button
                        type="button"
                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        onClick={() => setOpen(false)}
                        >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="space-y-6 py-2 pl-4">
                        <div className="flow-root">
                            <span className="-m-2 block text-gray-500 text-sm">
                            MENU UTAMA
                            </span>
                        </div>
                        <div className="flow-root">
                            <NavLinkSide href="#" className="-m-2 block p-2 text-gray-600">
                            Dashboard idwan
                            </NavLinkSide>
                        </div>
                        <div className="flow-root">
                            <NavLinkSide href="#" className="-m-2 block p-2 text-gray-600">
                            Bos
                            </NavLinkSide>
                        </div>
                        <div className="flow-root">
                        <NavLinkSide href="#" className="-m-2 block p-2 text-gray-600">
                            Ijazah
                            </NavLinkSide>
                        </div>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </Dialog>
            </Transition.Root>
            <Disclosure as="nav" className="bg-white border-b border-gray-200">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-14 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                    {/* Mobile menu button*/}
                    <button
                    type="button"
                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                    >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center pr-8">
                        <Link href="/" className="block text-purple-600 lg:hidden">
                            <div className="lg:mt-0 lg:col-span-5 lg:flex">
                                <img 
                                src="/images/logo-bolsel.webp" 
                                width={30}
                                height={16}
                                alt="hero image" />
                            </div>
                            
                        </Link>
                        <Link href="/" className="hidden text-purple-600 sm:block">
                            <div className="hidden lg:mt-0 lg:block">
                                <img 
                                src="/images/pdip-bolsel.png" 
                                width={105}
                                height={10}
                                alt="hero image" />
                            </div>
                        </Link>
                    </div>
                    <div className="hidden space-x-6 sm:-my-px sm:ml-6 lg:flex">
                        {auth.user.largest_order.role_id !== 1 ?
                            <NavLink href={route('dashboard', { partai: partai, tahun: tahun })} active={route().current('dashboard')}>
                                Dashboard
                            </NavLink>
                        :
                            <NavLink href={route('dashboard-admin')} active={route().current('dashboard-admin')}>
                                Dashboard
                            </NavLink>
                        }
                        
                        {/* {auth.user.largest_order.role_id == 2 ?
                            <NavLink href={route('suaramasuk.index', { partai: partai, tahun: tahun })} active={route().current('suaramasuk.*')}>
                                Suara Masuk
                                {suaraGlobal !== 0 ? 
                                    <span className="inline-flex items-center rounded-md bg-red-600 ml-2 px-2 py-0.5 text-sm font-semibold text-white ring-1 ring-inset ring-green-600/20">
                                        {suaraGlobal}
                                    </span>
                                : ''}
                            </NavLink>
                        :
                        null
                        } */}

                        {auth.user.largest_order.role_id == 2 ?
                            <NavLink href={route('inputsuara.dashboard', { partai: partai, tahun: tahun })} active={route().current('inputsuara.*')}>
                                Input Suara
                            </NavLink>
                        :
                        null
                        }
                        
                        {auth.user.largest_order.role_id == 2 ?
                            <NavLink href={route('laporansuara.dashboard', { partai: partai, tahun: tahun })} active={route().current('laporansuara.*')}>
                                Laporan Suara
                            </NavLink>
                        :
                        null
                        }
                        
                        {auth.user.largest_order.role_id == 5 ?
                            <NavLink href={route('laporsuara.dashboard', { partai: partai, tahun: tahun })} active={route().current('laporsuara.*')}>
                                Lapor Suara
                            </NavLink>
                        : 
                        null
                        }

                        {/* {auth.user.largest_order.role_id !== 1 ?
                            <NavLink href={route('hasilsuara.dashboard', { partai: partai, tahun: tahun })} active={route().current('hasilsuara.*')}>
                                Hasil Suara
                            </NavLink>
                        :
                        null
                        } */}

                        {auth.user.largest_order.role_id == 1 ?
                            <NavLink href={route('datapemilu.pemilu')} active={route().current('datapemilu.*')}>
                                Data Pemilu
                            </NavLink>
                        :
                        null
                        }
                        
                        <NavLink>
                            Data Pendukung
                        </NavLink>
                        <NavLink>
                            Users
                        </NavLink>
                    </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <div className="pl-2 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex w-full items-center rounded-md bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                                <div className="uppercase hidden lg:block pr-2">{auth.user.name}</div>
                            <UserCircleIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-2 w-48 mt-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-2 py-2">
                                <Menu.Item>
                                {({ active }) => (
                                    <Link
                                    href={route('profile.edit')}
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-700' : 'text-gray-500'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                    <UserIcon className="mr-2 w-4 h-4" />
                                    Profil
                                    </Link>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <Link
                                    href={route('password.edit')}
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-700' : 'text-gray-500'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                    <KeyIcon className="mr-2 w-4 h-4" />
                                    Ubah Password
                                    </Link>
                                )}
                                </Menu.Item>
                                <Menu.Item>
                                {({ active }) => (
                                    <Link
                                    href={route('logout')} method="post" as="button"
                                    className={`${
                                        active ? 'bg-gray-100 text-gray-700' : 'text-gray-500'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        <ArrowRightEndOnRectangleIcon className="mr-2 w-4 h-4" />
                                    Logout
                                    </Link>
                                )}
                                </Menu.Item>
                            </div>
                            </Menu.Items>
                        </Transition>
                        </Menu>
                    </div>
                    </div>
                </div>
                </div>
            </Disclosure>
        </header>
    );
}

import { Link, Head } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = {
    pages: [
      { name: 'Home', href: '#' },
      { name: 'Dashboard', href: '#' },
    ],
  }
  

export default function Home({ auth }) {
    const [open, setOpen] = useState(false);
    console.log(auth.user.largest_order.role_id == 1);
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-slate-100 tracking-wide">
                <header className="sticky top-0 z-10">
                {/* <p className="flex h-10 items-center justify-center bg-purple-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p> */}
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

                            <div className="space-y-4 py-2 px-4">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                    {page.name}
                                </a>
                                </div>
                            ))}
                            </div>

                            <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                            <div className="flow-root">
                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                Log in
                                </a>
                            </div>
                            <div className="flow-root">
                                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                                Registrasi
                                </a>
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
                            <div className="flex flex-shrink-0 items-center">
                                <Link href="/" className="block text-purple-600 lg:hidden">
                                    {/* <ApplicationLogo className="block h-9 w-auto fill-current text-rose-600 lg:hidden" /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </Link>
                                <Link href="/" className="hidden text-purple-600 lg:block">
                                    <img 
                                    src="./images/dikbud3.png" 
                                    width={110}
                                    height={10}
                                    alt="hero image" />
                                </Link>
                            </div>
                            {/* <div className="hidden space-x-6 sm:-my-px sm:ml-6 sm:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <NavLink href={route('bos.dashboard', { tahun: new Date().getFullYear() })} active={route().current('bos.*')}>
                                    Bos
                                </NavLink>
                                <NavLink href="#">
                                    Ijazah
                                </NavLink>
                                <NavLink href="#">
                                    Users
                                </NavLink>
                            </div> */}
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <div className="text-right">
                                {auth.user ? (
                                    <Link
                                        href={route('checkauth')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-purple-500"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-purple-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ml-4 font-semibold text-gray-600 hover:text-gray-900 focus:outline focus:outline-2 focus:rounded-sm focus:outline-purple-500"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        </div>
                    </div>
                </Disclosure>
                {/* <span
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                ></span> */}
                </header>
                
            </div>
        </>
    );
}

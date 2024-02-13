import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Modal({ children, isOpen, size = 'md', closeable, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'sm:max-w-screen-md',
        lg: 'sm:max-w-screen-lg',
        xl: 'sm:max-w-screen-xl',
        '2xl': 'sm:max-w-screen-2xl',
    }[size];

    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center md:px-4 sm:items-center">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full ${maxWidthClass}`}>
                        {children}
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
        </Transition.Root>
    );
}

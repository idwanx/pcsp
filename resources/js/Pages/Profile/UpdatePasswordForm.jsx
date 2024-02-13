import App from '@/Layouts/App';
import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, Head } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const kembali = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Ubah Password" />
            <div className="flex justify-center">
                <div className="w-full max-w-sm pt-6 lg:py-24">
                    <div className="p-4 sm:p-6 bg-white shadow sm:rounded-lg">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900">Ubah Password</h2>
                    </header>
                    <form onSubmit={updatePassword} className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="current_password" value="Password Sekarang" />

                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                required
                            />

                            <InputError message={errors.current_password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Password Baru" />

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password Baru" />

                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                type="password"
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                required
                            />

                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                            <button type="button" onClick={() => kembali()} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                                Kembali
                            </button>
                            <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                        </div>

                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}
UpdatePasswordForm.layout = page => <App children={page} />
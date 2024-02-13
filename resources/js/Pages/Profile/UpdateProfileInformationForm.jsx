import App from '@/Layouts/App';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    const kembali = () => {
        window.history.back();
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm pt-6 lg:py-24">
                <div className="p-4 sm:p-6 bg-white shadow sm:rounded-lg">
                <header>
                    <h2 className="text-lg font-medium text-gray-900">Informasi Profil</h2>
                </header>
                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nama" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800">
                                    Alamat email Anda belum diverifikasi.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Klik di sini untuk mengirim ulang email verifikasi.
                                </Link>
                            </p>

                            {status === 'verification-link-sent' && (
                                <div className="mt-2 font-medium text-sm text-green-600">
                                    Tautan verifikasi baru telah dikirim ke alamat email Anda.
                                </div>
                            )}
                        </div>
                    )}

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
    );
}
UpdateProfileInformation.layout = page => <App children={page} />
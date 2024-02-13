import { useEffect } from 'react';
import Guest from '@/Layouts/Guest';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'));
    };

    const kembali = () => {
        window.history.back();
    };

    return (
        <>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600">
                Masukkan password anda sebelum melanjutkan.
            </div>

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Konfirmasi
                    </PrimaryButton>
                </div> */}
                <div className="flex items-center justify-between mt-6">
                    <button type="button" onClick={() => kembali()} className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150">
                        Kembali
                    </button>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Konfirmasi
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}

ConfirmPassword.layout = page => <Guest children={page} />
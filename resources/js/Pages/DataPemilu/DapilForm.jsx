import { usePage } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';

export default function DapilForm({ isClose, data, setData, errors, processing, submit, submitLabel, title }) {
    const { pemilus } = usePage().props;

  return (
    <>
    <form onSubmit={submit} noValidate>
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <div className="mt-6">
                    
                    <InputLabel htmlFor="nama_pemilu" value="Nama Pemilu" />

                    <Select
                        id="pemilu_id"
                        name="pemilu_id"
                        autoComplete="pemilu_id"
                        className="block w-full py-2"
                        value={data.pemilu_id}
                        onChange={e => setData('pemilu_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih</option>
                        {pemilus.map(item => <option key={item.id} value={item.id}>{item.nama_pemilu}-{item.tahun}</option>)}
                    </Select>

                    <InputError message={errors.pemilu_id} className="mt-2" />
                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nama_dapil" value="Nama Dapil" />

                    <TextInput
                        id="nama_dapil"
                        name="nama_dapil"
                        value={data.nama_dapil}
                        className="mt-1 block w-full"
                        autoComplete="nama_dapil"
                        onChange={(e) => setData('nama_dapil', e.target.value)}
                        required
                    />

                    <InputError message={errors.nama_dapil} className="mt-2" />
                </div>
            </div>
        </div>
        <div className="bg-slate-100 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <PrimaryButton disabled={processing}>
                {submitLabel}
            </PrimaryButton>
            <SecondaryButton onClick={isClose}>Tutup</SecondaryButton>
        </div>
    </form>
    </>
  );
}
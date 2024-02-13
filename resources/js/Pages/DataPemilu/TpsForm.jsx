import { usePage } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';

export default function TpsForm({ isClose, data, setData, errors, processing, submit, submitLabel, title }) {
    const { dapils, desas } = usePage().props;

  return (
    <>
    <form onSubmit={submit} noValidate>
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <div className="mt-6">
                    
                    <InputLabel htmlFor="dapil_id" value="Dapil" />

                    <Select
                        id="dapil_id"
                        name="dapil_id"
                        autoComplete="dapil_id"
                        className="block w-full py-2"
                        value={data.dapil_id}
                        onChange={e => setData('dapil_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih</option>
                        {dapils.map(item => <option key={item.id} value={item.id}>{item.nama_dapil} - {item.nama_pemilu} - {item.tahun}</option>)}
                    </Select>

                    <InputError message={errors.dapil_id} className="mt-2" />
                    
                </div>

                <div className="mt-4">
                    
                    <InputLabel htmlFor="desa_id" value="Desa" />

                    <Select
                        id="desa_id"
                        name="desa_id"
                        autoComplete="desa_id"
                        className="block w-full py-2"
                        value={data.desa_id}
                        onChange={e => setData('desa_id', e.target.value)}
                        required
                    >
                        <option value="">Pilih</option>
                        {desas.map(desa => <option key={desa.id} value={desa.id}>{desa.nama_desa}</option>)}
                    </Select>

                    <InputError message={errors.desa_id} className="mt-2" />
                    
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="nama_tpsuara" value="Nama TPS" />

                    <TextInput
                        id="nama_tpsuara"
                        name="nama_tpsuara"
                        value={data.nama_tpsuara}
                        className="mt-1 block w-full"
                        autoComplete="nama_tpsuara"
                        onChange={(e) => setData('nama_tpsuara', e.target.value)}
                        required
                    />

                    <InputError message={errors.nama_tpsuara} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="jlh_pemilih" value="Jumlah Pemilih" />

                    <TextInput
                        id="jlh_pemilih"
                        type="number"
                        name="jlh_pemilih"
                        value={data.jlh_pemilih}
                        className="mt-1 block w-full"
                        autoComplete="jlh_pemilih"
                        onChange={(e) => setData('jlh_pemilih', e.target.value)}
                        required
                    />

                    <InputError message={errors.jlh_pemilih} className="mt-2" />
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
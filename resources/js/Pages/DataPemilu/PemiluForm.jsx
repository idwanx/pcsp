import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function PemiluForm({ isClose, data, setData, errors, processing, submit, submitLabel, title }) {
  return (
    <>
    <form onSubmit={submit}>
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <div className="mt-6">
                    <InputLabel htmlFor="nama_pemilu" value="Nama Pemilu" />

                    <TextInput
                        id="nama_pemilu"
                        name="nama_pemilu"
                        value={data.nama_pemilu}
                        className="mt-1 block w-full"
                        autoComplete="nama_pemilu"
                        isFocused={true}
                        onChange={(e) => setData('nama_pemilu', e.target.value)}
                        required
                    />

                    <InputError message={errors.nama_pemilu} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="tahun" value="Tahun" />

                    <TextInput
                        id="tahun"
                        type="number"
                        name="tahun"
                        value={data.tahun}
                        className="mt-1 block w-full"
                        autoComplete="tahun"
                        onChange={(e) => setData('tahun', e.target.value)}
                        required
                    />

                    <InputError message={errors.tahun} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="icon" value="icon" />

                    <TextInput
                        id="icon"
                        name="icon"
                        value={data.icon}
                        className="mt-1 block w-full"
                        autoComplete="icon"
                        onChange={(e) => setData('icon', e.target.value)}
                        required
                    />

                    <InputError message={errors.icon} className="mt-2" />
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
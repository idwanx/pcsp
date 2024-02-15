import { usePage, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function SuaraPartaiForm({ isClose, model }) {
    const { partai, tahun } = usePage().props;
    const { data, setData, post, processing } = useForm({
        jlh_suara: model.partai.suarapartai?.jlh_suara || '',
        partai_id: model.partai.id,
        tpsuara_id: model?.tps,
    });

    

    const storeSuaraPartai = (e) => {
        e.preventDefault();
        post(route('inputsuara.storesuarapartai', { partai: partai, tahun: tahun }), {
            preserveScroll: true,
            onSuccess: () => {
                isClose();
            },
        });
    };


  return (
    <>
    <form 
        onSubmit={storeSuaraPartai} 
        noValidate
    >
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    Input Suara Partai
                </h3>

                <div className="mt-4">
                    <InputLabel htmlFor="jlh_suara" value="Jumlah Suara" />
                    <TextInput
                        id="jlh_suara"
                        type="number"
                        name="jlh_suara"
                        value={data.jlh_suara}
                        className="mt-1 block w-full"
                        autoComplete="jlh_suara"
                        onChange={(e) => setData('jlh_suara', e.target.value)}
                        required
                    />

                    {/* <InputError message={errors.jlh_suara} className="mt-2" /> */}
                </div>
            </div>
        </div>
        <div className="bg-slate-100 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <PrimaryButton disabled={processing}>
                Simpan
            </PrimaryButton>
            <SecondaryButton onClick={isClose}>Tutup</SecondaryButton>
        </div>
    </form>
    </>
  );
}
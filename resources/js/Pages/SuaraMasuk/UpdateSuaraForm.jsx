import { useForm, usePage } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';

export default function UpdateSuaraForm({ model, isClose, submitLabel, title }) {
    const { partai, tahun } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        jlh_suara_tps: model?.jlh_suara_tps || '',
     });


    const approveHandler = (e) => {
        e.preventDefault();
        put(route('suaramasuk.updatesuara', {partai: partai, tahun: tahun, calonTpsuara: model.id}), {
            preserveScroll: true,
            onSuccess: () => {
                isClose();
            },
        });
    };

  return (
    <>
        <form onSubmit={approveHandler} noValidate>
            <div className="text-sm text-gray-500 p-4">
                <div className="text-center sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                        {title}
                    </h3>
                    
                        <ul role="list" className="py-4">
                            <li className="px-3 p-3 ring-1 ring-inset rounded-lg ring-gray-600/20">
                                <div className="flex gap-x-4">
                                {model.calon.foto == null ?
                                    <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src="/images/no-camera.png" alt="" />
                                :
                                    <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={`/storage/${model.calon.foto}`} alt="" />
                                }
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold tracking-tight text-gray-700">{model.calon.user.name}</h3>
                                        <p className="truncate text-sm text-gray-500 max-w-readables">{model.calon.partai.nama_partai}</p>
                                        <p className="truncate text-sm text-gray-500 max-w-readables">No. Urut : {model.calon.no_urut}</p>
                                        <div className="grid grid-cols-2 gap-2 items-center mt-2">
                                            <div>Jumlah Suara</div>
                                            <div>
                                                <TextInput
                                                    id="jlh_suara_tps"
                                                    type="number"
                                                    name="jlh_suara_tps"
                                                    value={data.jlh_suara_tps}
                                                    className="mt-1 block w-full"
                                                    autoComplete="jlh_suara_tps"
                                                    onChange={(e) => setData('jlh_suara_tps', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end"><InputError message={errors.jlh_suara_tps} className="mt-2" /></div>
                                    </div>
                                </div>
                            </li>
                        </ul>

                </div>
            </div>
            <div className="flex items-end bg-slate-100 gap-4 px-4 py-3 flex-row-reverse sm:px-6">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
                <SecondaryButton onClick={isClose}>Tutup</SecondaryButton>
            </div>
        </form>
    </>
  );
}
import { usePage, useForm } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import FileInput from '@/Components/FileInput';

export default function CalonForm(props) {
    const { dapils, partais } = usePage().props;

    const { isClose, model, submitLabel, title } = props;

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
       user_id: model.user_id || '',
       no_urut: model.no_urut || '',
       partai_id: model.partai_id || '',
       dapil_id: model.dapil_id || '',
       foto: model.foto !== null ? null : '',
    });

    const closeForm = () => {
        isClose();
        reset();
        clearErrors();
    }

    const storeHandler = (e) => {
        e.preventDefault();
        post(route('datapemilu.storecalon'), {
            preserveScroll: true,
            onSuccess: () => {
                isClose();
            },
        });
    };

    const updateHandler = (e) => {
        e.preventDefault();
        post(route('datapemilu.updatecalon', model.id), {
            preserveScroll: true,
            onSuccess: () => {
                isClose();
            },
        });
    };

  return (
    <>
    <form onSubmit={submitLabel === 'Tambah' ? storeHandler : updateHandler} noValidate>
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 mt-6">
                        Silahkan Pilih User
                        <div className="mt-4">
                            <InputLabel htmlFor="user_id" value="User" />
                            <TextInput
                                id="user_id"
                                type="number"
                                name="user_id"
                                value={data.user_id}
                                className="mt-1 block w-full"
                                autoComplete="user_id"
                                onChange={(e) => setData('user_id', e.target.value)}
                                required
                            />
                            <InputError message={errors.user_id} className="mt-2" />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 mt-6 pl-6">
                        <InputLabel htmlFor="partai_id" value="Partai" />
                        <Select
                            id="partai_id"
                            name="partai_id"
                            autoComplete="partai_id"
                            className="mt-1 block w-full"
                            value={data.partai_id}
                            onChange={e => setData('partai_id', e.target.value)}
                            required
                        >
                            <option value="">Pilih</option>
                            {partais.map(partai => <option key={partai.id} value={partai.id}>{partai.nama_partai}</option>)}
                        </Select>
                        <InputError message={errors.partai_id} className="mt-2" />

                        <div className="mt-4">
                            <InputLabel htmlFor="no_urut" value="No. Urut" />
                            <TextInput
                                id="no_urut"
                                type="number"
                                name="no_urut"
                                value={data.no_urut}
                                className="mt-1 block w-full"
                                autoComplete="no_urut"
                                onChange={(e) => setData('no_urut', e.target.value)}
                                required
                            />
                            <InputError message={errors.no_urut} className="mt-2" />
                        </div>
                        
                        <div className="mt-4">
                            <InputLabel htmlFor="dapil_id" value="Dapil" />
                            <Select
                                id="dapil_id"
                                name="dapil_id"
                                autoComplete="dapil_id"
                                className="mt-1 block w-full"
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
                            <InputLabel htmlFor="foto" value="Foto" />
                            <div className={`border border-gray-300 ${errors.foto && 'border-red-600'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`}>
                                <FileInput
                                    name="foto"
                                    accept=".jpg,.jpeg,.png,.avif"
                                    errors={errors.foto}
                                    value={data.foto}
                                    onChange={files => setData('foto', files)}
                                />
                            </div>
                            <InputError message={errors.foto} className="mt-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="bg-slate-100 gap-4 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <PrimaryButton disabled={processing}>
                {submitLabel}
            </PrimaryButton>
            <SecondaryButton onClick={closeForm}>Tutup</SecondaryButton>
        </div>
    </form>
    </>
  );
}
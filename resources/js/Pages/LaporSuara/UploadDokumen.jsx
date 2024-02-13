import { useForm, usePage, router } from '@inertiajs/react';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import FileInput from '@/Components/FileInput';

export default function UploadDokumen({ isClose, model, submitLabel, title }) {
    const { partai, tahun } = usePage().props;

    const { data, setData, post, processing, errors, progress, reset, clearErrors } = useForm({
        keterangan: '',
        files: null,
     });
 
    //  const closeForm = () => {
    //      isClose();
    //      reset();
    //      clearErrors();
    //  }
 
     const uploadHandler = (e) => {
         e.preventDefault();
         post(route('laporsuara.uploaddokumen', { partai: partai, tahun: tahun, tpsuara: model }), {
             preserveScroll: true,
             onSuccess: () => {
                reset(),
                clearErrors();
            },
         });
     };

    //  console.log(model);
  return (
    <>
    <form onSubmit={uploadHandler} noValidate>
        <div className="bg-white text-sm text-gray-500 lg:p-6 p-2">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                    {title}
                </h3>

                <div className="mt-4">
                    <InputLabel htmlFor="keterangan" value="Keterangan" />

                    <TextInput
                        id="keterangan"
                        type="text"
                        name="keterangan"
                        value={data.keterangan}
                        className="mt-1 block w-full"
                        autoComplete="keterangan"
                        onChange={(e) => setData('keterangan', e.target.value)}
                        required
                    />

                    <InputError message={errors.keterangan} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="files" value="files" />
                    <div className={`border border-gray-300 ${errors.files && 'border-red-600'} focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm`}>
                        <FileInput
                            name="files"
                            accept=".jpg,.jpeg,.png,.avif,.pdf"
                            errors={errors.files}
                            value={data.files}
                            onChange={files => setData('files', files)}
                        />
                    </div>
                    <InputError message={errors.files} className="mt-2" />
                </div>

                {progress && (
                    <progress className="mt-1 block w-full bg-green-500 text-white" value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}

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
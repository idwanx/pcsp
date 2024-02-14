import { useState, useEffect } from 'react';
import { UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePage, Link } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';

export default function PanelKandidat({setIsPanelKandidat, model, judul}) {
    const { partai, dapil, tahun } = usePage().props;
    
    const [kandidats, setKandidats] = useState([
        {
            id: '',
            nama_partai: '',
            calons: [{
                id: '',
                foto: '',
                user: { name: ''},
                calontpsuaras: { id: '', jlh_suara_tps: '' }
            }],
        }
    ]);

    // const [tes, setTes] = useState([{
    //     id: '',
    //     nama_partai: '',
    //     calons: [{
    //         id: '',
    //         foto: '',
    //         user: { name: ''},
    //         jlh_suara_tps: ''
    //     }],
    // }]);

    // const [kandidats, setKandidats] = useState([]);

    // const { data, setData, post, errors, processing } = useForm({
    //     id: '',
    //     jlh_suara_tps: '',
    // });

    useEffect(() => {
        if(model.id) {
            async function fetchData() {
                await fetch(route('inputsuara.kandidat', { partai: partai, tahun: tahun, dapil: dapil.id, tpsuara: model.id }))
                    .then(response => response.json())
                    .then(data => 
                        // setKandidats(data.dataKandidat)
                        {
                            const calon = data.dataKandidat.map(item => {
                                return (
                                    {nama_partai: item.nama_partai, logo: item.logo,
                                        calons: [
                                            ...item.calons.map(suara => (
                                                    {...suara, calon_id: suara.calontpsuaras?.calon_id, jlh_suara_tps: suara.calontpsuaras?.jlh_suara_tps || ''}
                                            ))
                                        ]
                                    }
                                );
                            });

                            setKandidats(calon)
                        }
                        
                    )
              }
              fetchData();
        }
        
    }, [model.id]);

    const closePanelKandidat = () => {
         setIsPanelKandidat(false);
    };

    const handleFormChange = (indexp, indexc, event) => {
        let data = [
            ...kandidats,
            //   {...kandidats.calons}
          ];
        
        data[indexp].calons[indexc] [event.target.name] = event.target.value;

        setKandidats(data);
    }
    
    return (
        <>
            <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{judul}</h3>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => closePanelKandidat(false)}
                        >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <span className="text-sm font-normal text-gray-500">Dari jumlah suara sah {model.nama_tpsuara}</span>
                <hr className='mt-2' />
                <div className="py-4">
                    <div className="flow-root">
                        <div className="grid grid-cols-1 gap-2 divide-y">
                        {kandidats?.map((kandidat, indexp) => (
                            <div key={indexp}>
                                <div className="flex py-2 items-center">
                                    <div className=" truncate flex flex-1 flex-col min-w-0 text-base font-semibold">
                                        {kandidat.nama_partai}
                                    </div>
                                        <img className="h-16 w-16 flex-none rounded-md bg-gray-50" src={`/storage/${kandidat.logo}`} alt="" />
                                </div>
                                
                                    <div className="ml-2 space-y-4 border-l-2 border-dashed">
                                    
                                    {kandidat?.calons.map((calon, indexc) => (
                                        <div key={calon.id} className="relative w-full">
                                            <UserCircleIcon className="h-7 w-7 absolute -top-0.5 z-10 -ml-3.5 text-gray-400" />
                                            <div className="ml-6">
                                                <h4 className="font-bold text-gray-800">{calon.user.name}</h4>
                                                <form>
                                                    <div class="grid grid-cols-3 mt-2 gap-4 items-center">
                                                        <div className="text-gray-500 flex justify-end">Jlh.Suara</div>
                                                        <div className='max-w-screen-sm'>
                                                            <TextInput
                                                                id="jlh_suara_tps"
                                                                type="number"
                                                                name="jlh_suara_tps"
                                                                value={calon?.jlh_suara_tps}
                                                                className="block w-full"
                                                                autoComplete="jlh_suara_tps"
                                                                onChange={event => handleFormChange(indexp, indexc, event)}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="flex">
                                                            <Link className="inline-flex items-center px-4 py-2 bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150" method="post" as="button" href={route('inputsuara.storesuara', { partai: partai, tahun: tahun })} data={{ calon_id: calon?.id, tpsuara_id: model.id, jlh_suara_tps: calon?.jlh_suara_tps }}>
                                                                <span className="text-white">UPDATE</span>
                                                            </Link>
                                                        </div>

                                                    </div>
                                                        {/* <div className="max-w-screen-sm text-sm text-gray-500">
                                                            
                                                        </div> */}
                                                </form>
                                            </div>
                                            
                                        </div>
                                    ))}
                                    </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

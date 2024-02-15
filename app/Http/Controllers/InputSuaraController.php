<?php

namespace App\Http\Controllers;

use Throwable;
use Inertia\Inertia;
use App\Models\Calon;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use App\Events\SuaraMasuk;
use App\Models\Suararusak;
use App\Models\CalonTpsuara;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\InputSuara\CalonResource;
use App\Http\Resources\InputSuara\TpsuaraResource;
use App\Http\Resources\InputSuara\SuaraCalonResource;
use App\Http\Requests\InputSuara\StoreSuaraRusakRequest;
use App\Models\Kecamatan;
use App\Models\Suarapartai;
use Illuminate\Contracts\Database\Eloquent\Builder as MyBuilder;

class InputSuaraController extends Controller
{
    public function dashboard(Partai $partai, Request $request): Response
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::has('dapils')->where('tahun', '=', $tahun)->get();

        return Inertia::render('InputSuara/Dashboard', [
            'partai' => $partai,
            'tahun' => $tahun,
            'menupemilu' => $menupemilu,
        ]);
    }

    public function pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Request $request)
    {
        // if(Gate::denies('operator-partai', [$partai, $request])) {
        //     abort(403);
        // }
        
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $dapil = $pemilu->dapils()->first();

        return Redirect::route('inputsuara.suarapemilu', [
            'partai' => $partai, 
            'tahun' => $tahun, 
            'pemilu' => $pemilu->id, 
            'dapil' => $dapil->id
        ]);
    }

    public function suara_pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request): Response
    {
        // if(Gate::denies('operator-partai', [$partai, $request])) {
        //     abort(403);
        // }

        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::has('dapils')->with('dapils')->where('tahun', '=', $tahun)->get();

        $tpsuara = Tpsuara::query()->select(['tpsuaras.id', 'kecamatans.nama_kecamatan', 'desas.nama_desa', 'tpsuaras.nama_tpsuara', 'tpsuaras.jlh_pemilih'])
        ->withCount([
            'calontpsuaras' => function (Builder $query) use($partai) {
                $query
                        // ->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(calon_tpsuara.jlh_suara_tps),0)'))
                        // ->where('role_user.partai_id', '=', $partai->id)
                        // ->where('calon_tpsuara.is_verified_at', '!=', null)
                        ;
            },
        ])
        ->withCount([
            'suararusaks' => function (Builder $query) use($partai) {
                $query
                        // ->leftJoin('role_user', 'suararusaks.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(suararusaks.suara_rusak),0)'))
                        // ->where('role_user.partai_id', '=', $partai->id)
                        // ->where('suararusaks.is_verified_at', '!=', null)
                        ;
            },
        ])
        ->leftJoin('desas', 'tpsuaras.desa_id', '=', 'desas.id')
        ->leftJoin('kecamatans', 'desas.kecamatan_id', '=', 'kecamatans.id')

        ->when(request('kecamatan'), function ($q) use ($request, $dapil) {
            return $q->when(request('cari'), function ($q) use ($request, $dapil) {
                            return $q->where('kecamatans.id', $request->kecamatan)
                                        ->where('desas.nama_desa', 'like', "%{$request->cari}%")
                                        ->where('tpsuaras.dapil_id', $dapil->id);
                        }, function ($q) use ($request, $dapil) {
                            return $q->where('kecamatans.id', $request->kecamatan)->where('tpsuaras.dapil_id', $dapil->id);
                        });
        }, function ($q) use ($dapil) {
            return $q->where('tpsuaras.dapil_id', $dapil->id);
        });

    
        // $dataKandidat = Partai::withWhereHas('calons', function ($query) use ($pemilu, $dapil) {
        //     $query->whereHas('dapil', function ($q) use ($pemilu) {
        //         $q->where('pemilu_id', $pemilu->id);
        //     })->where('dapil_id', $dapil->id)
        //     ->with('calontpsuaras', function ($k) {
        //         $k->where('tpsuara_id', 2);
        //     })->with('user');
        // })
        // ->orderBy('id', 'asc')
        // ->get();

        $kecamatans = Kecamatan::all();

        return Inertia::render('InputSuara/SuaraPemilu', [
            'partai' => $partai,
            'tahun' => $tahun,
            'pemilu' => $pemilu,
            'menupemilu' => $menupemilu,
            'tpsuara' => TpsuaraResource::collection($tpsuara->paginate(20)->withQueryString()),
            'dapil' => $dapil,
            // 'dataKandidat' => $dataKandidat,
            'kecamatans' => $kecamatans,
            'filtered' => $request->only(['kecamatan', 'cari']),
        ]);
    }

    public function kandidat(Partai $partai, string $tahun, Dapil $dapil, Tpsuara $tpsuara, Request $request)
    {
        // if(Gate::denies('operator-partai', [$partai, $request])) {
        //     abort(403);
        // }

        $dataKandidat = Partai::withWhereHas('calons', function ($query) use ($dapil, $tpsuara) {
            $query->whereHas('dapil', function ($q) use ($dapil) {
                $q->where('id', $dapil->id);
            })->where('dapil_id', $dapil->id)
            ->with('calontpsuaras', function ($k) use ($tpsuara) {
                $k->where('tpsuara_id', $tpsuara->id);
            })->with('user');
        })
        ->with('suarapartai')
        // ->orderBy('id', 'asc')
        ->get();



        return response()->json([
            // 'dataKandidat' => CalonResource::collection($dataKandidat),
            'dataKandidat' => $dataKandidat
        ]);
    }

    public function store_suara(Partai $partai, string $tahun, Tpsuara $tpsuara, Request $request)
    {
        // if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
        //     abort(403);
        // }

            try {
                
                CalonTpsuara::updateOrCreate(
                    ['calon_id' => $request->calon_id, 'tpsuara_id' => $request->tpsuara_id, 'user_id' => $request->user()->id],
                    [
                        'jlh_suara_tps' => $request->filled('jlh_suara_tps') ? $request->jlh_suara_tps : '0',
                        'is_verified_at' => now(),
                        'user_verified' => $request->user()->id
                    ], ['jlh_suara_tps']
                );

                broadcast(new SuaraMasuk('suara-masuk'))->toOthers();
        
                return back()->with([
                    'type' => 'success',
                    'message' => 'Jumlah suara berhasil dikirim',
                ]);
                
            } catch (Throwable) {
                return back()->with([
                    'type' => 'error',
                    'message' => 'Terjadi kesalahan, silahkan hubungi admin',
                ]);
            }
            
    }

    public function store_suara_partai(Partai $partai, string $tahun, Request $request)
    {
        // if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
        //     abort(403);
        // }

        Suarapartai::updateOrCreate(
            ['partai_id' => $request->partai_id, 'tpsuara_id' => $request->tpsuara_id],
            [
                'jlh_suara' => $request->filled('jlh_suara') ? $request->jlh_suara : '0',
            ], ['jlh_suara']
        );

            // try {
                
            //     Suarapartai::updateOrCreate(
            //         ['partai_id' => $request->partai_id, 'tpsuara_id' => $request->tpsuara_id],
            //         [
            //             'jlh_suara' => $request->filled('jlh_suara') ? $request->jlh_suara : '0',
            //         ], ['jlh_suara']
            //     );

        
            //     return back()->with([
            //         'type' => 'success',
            //         'message' => 'Jumlah suara partai berhasil disimpan',
            //     ]);
                
            // } catch (Throwable) {
            //     return back()->with([
            //         'type' => 'error',
            //         'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            //     ]);
            // }
            
    }



    public function store_suara_rusak(Partai $partai, string $tahun, Tpsuara $tpsuara, StoreSuaraRusakRequest $request)
    {
        // if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
        //     abort(403);
        // }

        $suararusak = Suararusak::updateOrCreate(
            ['user_id' => $request->user()->id, 'tpsuara_id' => $tpsuara->id],
            ['suara_rusak' => $request->filled('suara_rusak') ? $request->suara_rusak : '0'], ['suara_rusak']
        );

        broadcast(new SuaraMasuk('suara-masuk'))->toOthers();

        return back()->with([
            'type' => 'success',
            'message' => 'Jumlah suara rusak berhasil disimpan',
        ]);
        
    }
    

}

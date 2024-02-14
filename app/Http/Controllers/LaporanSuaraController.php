<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Calon;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use App\Models\Kecamatan;
use App\Models\CalonTpsuara;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\LaporanSuara\PemiluResource;
use App\Http\Resources\LaporanSuara\TpsuaraResource;
use App\Http\Resources\LaporanSuara\SuaraCalonResource;

class LaporanSuaraController extends Controller
{
    public function dashboard(Partai $partai, Request $request): Response
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::has('dapils')->where('tahun', '=', $tahun)->get();
        
        return Inertia::render('LaporanSuara/Dashboard', [
            'partai' => $partai,
            'tahun' => $tahun,
            'menupemilu' => PemiluResource::collection($menupemilu),
        ]);
    }

    public function pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Request $request)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }
        
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $dapil = $pemilu->dapils()->first();

        return Redirect::route('laporansuara.suarapemilu', [
            'partai' => $partai, 
            'tahun' => $tahun, 
            'pemilu' => $pemilu->id, 
            'dapil' => $dapil->id
        ]);
    }

    public function suara_pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request): Response
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::has('dapils')->with('dapils')->where('tahun', '=', $tahun)->get();

        $jumlah = Dapil::withCount([
            'tpsuaras as pemilih' => function (Builder $query) {
                $query->select(DB::raw('COALESCE(sum(jlh_pemilih),0)'));
            },
            'calonTpsuaras as suara_sah' => function (Builder $query) use($partai) {
                $query
                        // ->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(calon_tpsuara.jlh_suara_tps),0)'))
                        // ->where('role_user.partai_id', '=', $partai->id)
                        // ->where('calon_tpsuara.is_verified_at', '!=', null)
                        ;
            },
            'suaraRusaks as suara_rusak' => function (Builder $query) use($partai) {
                $query
                        // ->leftJoin('role_user', 'suararusaks.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(suararusaks.suara_rusak),0)'))
                        // ->where('role_user.partai_id', '=', $partai->id)
                        // ->where('suararusaks.is_verified_at', '!=', null)
                        ;
            },
        ])->where('pemilu_id', '=', $pemilu->id)->get();

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
        
        
        
        // ->where('tpsuaras.dapil_id', $dapil->id)
        
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

        $total = $jumlah->pipe(function ($collection) {
            return collect([
              'total_pemilih' => $collection->sum('pemilih'),
              'total_suara_rusak' => $collection->sum('suara_rusak'),
              'total_suara_sah' => $collection->sum('suara_sah'),
              'total_sisa' => $collection->sum('pemilih')-($collection->sum('suara_sah')+$collection->sum('suara_rusak')),
            ]);
        });

        $filterdapil = $jumlah->where('id', $dapil->id)->first();

        $suaraperdapils = Calon::select(['calons.id', 'calons.foto', 'users.name', 'partais.nama_partai', 'partais.warna'])
        ->withCount([
            'calontpsuaras' => function (Builder $query) use($partai) {
                $query->select(DB::raw('COALESCE(sum(jlh_suara_tps),0)'))
                // ->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id')
                // ->where('role_user.partai_id', '=', $partai->id)
                // ->where('calon_tpsuara.is_verified_at', '!=', null)
                ;
            },
        ])
        ->leftJoin('users', 'calons.user_id', '=', 'users.id')
        ->leftJoin('partais', 'calons.partai_id', '=', 'partais.id')
        ->where('calons.dapil_id', '=', $dapil->id)
        ->orderBy('calontpsuaras_count', 'desc')
        ->get();

        return Inertia::render('LaporanSuara/SuaraPemilu', [
            'partai' => $partai,
            'tahun' => $tahun,
            'filterdapil' => $filterdapil,
            'total' => $total,
            'dapil' => $dapil,
            'menupemilu' => PemiluResource::collection($menupemilu),
            'pemilu' => new PemiluResource($pemilu),
            'tpsuara' => TpsuaraResource::collection($tpsuara->paginate(20)->withQueryString()),
            'suaraperdapils' => SuaraCalonResource::collection($suaraperdapils),
            'kecamatans' => Kecamatan::all(),
            'filtered' => $request->only(['kecamatan', 'cari']),
        ]);
    }

    public function kandidat(Partai $partai, string $tahun, Tpsuara $tpsuara, Request $request)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        $dataKandidat = CalonTpsuara::select('calon_tpsuara.calon_id', 'calon_tpsuara.jlh_suara_tps', 'calons.foto', 'users.name', 'partais.nama_partai', 'partais.warna', )
        ->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id', 'partais.warna')
        ->leftJoin('calons', 'calon_tpsuara.calon_id', '=', 'calons.id')
        ->leftJoin('users', 'calons.user_id', '=', 'users.id')
        ->leftJoin('partais', 'calons.partai_id', '=', 'partais.id')
        ->where('calon_tpsuara.tpsuara_id', '=', $tpsuara->id)
        // ->where('is_verified_at', '!=', null)
        // ->where('role_user.partai_id', '=', $partai->id)
        ->orderBy('jlh_suara_tps', 'desc')
        ->get();
        
        return response()->json([
            'dataKandidat' => SuaraCalonResource::collection($dataKandidat),
        ]);
    }
}

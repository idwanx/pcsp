<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use App\Events\SuaraMasuk;
use App\Models\Suararusak;
use App\Models\CalonTpsuara;
use Illuminate\Http\Request;
use App\Models\Dokumentpsuara;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\JoinClause;
use App\Http\Resources\SuaraMasuk\InfoTpsResource;
use App\Http\Resources\SuaraMasuk\SuaraMasukResource;
use App\Http\Resources\SuaraMasuk\MenuTpsuaraResource;
use Illuminate\Database\Query\Builder as QueryBuilder;
use App\Http\Requests\SuaraMasuk\VerifikasiSuaraRequest;
use App\Http\Requests\SuaraMasuk\UpdateSuaraRusakRequest;

class SuaraMasukController extends Controller
{
    public function check(Partai $partai, Request $request)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $totalsuaramasuk = DB::table('calon_tpsuara')
            ->select('calon_tpsuara.tpsuara_id', DB::raw('count(calon_tpsuara.id) as jlh_suara_masuk'))
            ->whereExists(function (QueryBuilder $query) use ($partai) {
                $query->select(DB::raw(1))
                        ->from('role_user')
                        ->where('partai_id', '=', $partai->id)
                        ->whereColumn('role_user.user_id', 'calon_tpsuara.user_id');
            })
            ->where('calon_tpsuara.is_verified_at', '=', null)
            ->whereYear('calon_tpsuara.created_at', '=', $tahun)
            ->groupBy('calon_tpsuara.tpsuara_id')->get();
        
        return response()->json([
            'totalsuaramasuk' => $totalsuaramasuk,
        ]);
    }

    public function index(Partai $partai, string $tahun, Request $request): Response
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }
        
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }
        
        $suaraMasuk = DB::table('calon_tpsuara')
            ->select('calon_tpsuara.tpsuara_id', 'pemilus.nama_pemilu', DB::raw('count(calon_tpsuara.id) as jlh_suara_masuk'))
            ->whereExists(function (QueryBuilder $query) use ($partai) {
                $query->select(DB::raw(1))
                        ->from('role_user')
                        ->where('partai_id', '=', $partai->id)
                        ->whereColumn('role_user.user_id', 'calon_tpsuara.user_id');
            })
            ->leftJoin('tpsuaras', 'calon_tpsuara.tpsuara_id', '=', 'tpsuaras.id')
            ->leftJoin('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
            ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
            ->where('calon_tpsuara.is_verified_at', '=', null)
            ->whereYear('calon_tpsuara.created_at', '=', $tahun)
            ->groupBy('calon_tpsuara.tpsuara_id');
 
        $menutps = DB::table('tpsuaras')
            ->joinSub($suaraMasuk, 'suara_masuk', function (JoinClause $join) {
                $join->on('tpsuaras.id', '=', 'suara_masuk.tpsuara_id');
            })
            ->get();

        return Inertia::render('SuaraMasuk/Index', [
            'partai' => $partai,
            'tahun' => $tahun,
            'menutps' => MenuTpsuaraResource::collection($menutps),
        ]);
    }

    public function suara_masuk(Partai $partai, string $tahun, Tpsuara $tpsuara, Request $request): Response
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }
        
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $suaraMasuk = DB::table('calon_tpsuara')
            ->select('calon_tpsuara.tpsuara_id', 'pemilus.nama_pemilu', DB::raw('count(calon_tpsuara.id) as jlh_suara_masuk'))
            ->whereExists(function (QueryBuilder $query) use ($partai) {
                $query->select(DB::raw(1))
                        ->from('role_user')
                        ->where('partai_id', '=', $partai->id)
                        ->whereColumn('role_user.user_id', 'calon_tpsuara.user_id');
            })
            ->leftJoin('tpsuaras', 'calon_tpsuara.tpsuara_id', '=', 'tpsuaras.id')
            ->leftJoin('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
            ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
            ->where('calon_tpsuara.is_verified_at', '=', null)
            ->whereYear('calon_tpsuara.created_at', '=', $tahun)
            ->groupBy('calon_tpsuara.tpsuara_id');
 
        $menutps = DB::table('tpsuaras')
            ->joinSub($suaraMasuk, 'suara_masuk', function (JoinClause $join) {
                $join->on('tpsuaras.id', '=', 'suara_masuk.tpsuara_id');
            })->get();


        $pemilu = Pemilu::withWhereHas('dapilTpsuara', function ($query)  use($tpsuara, $partai) {
            $query
            ->with([
                'calontpsuaras' => function ($query) use ($partai) { 
                    $query->whereHas('roleuser', function ($q) use ($partai) {
                        $q->where('role_user.partai_id', '=', $partai->id);
                    })->with(['calon.user', 'calon.partai'])
                    ->where('calon_tpsuara.is_verified_at', '=', null);

                    // $query->leftJoin('role_user', 'calon_tpsuara.user_id', '=', 'role_user.user_id')
                    //         ->leftJoin('calons', 'calon_tpsuara.calon_id', '=', 'calons.id')
                    //         ->leftJoin('users', 'calons.user_id', '=', 'users.id')
                    //         ->where('role_user.partai_id', '=', $partai->id)
                    //         ->where('calon_tpsuara.is_verified_at', '=', null);
                },
            ])
            ->where('tpsuaras.id', '=', $tpsuara->id);
        })
        ->where('tahun', '=', $tahun)
        ->get();

        $tps = Tpsuara::select(['tpsuaras.id', 'tpsuaras.jlh_pemilih', 'tpsuaras.nama_tpsuara', 'suararusaks.id as suararusak_id', 'suararusaks.suara_rusak', 'desas.nama_desa', 'kecamatans.nama_kecamatan'])
        ->with('dokumentpsuaras')
        ->withCount([
            'calontpsuara as suara_sah' => function (Builder $query) use($partai) {
                $query->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(calon_tpsuara.jlh_suara_tps),0)'))
                        ->where('role_user.partai_id', '=', $partai->id);
            },
        ])
        ->leftJoin('suararusaks', 'tpsuaras.id', '=', 'suararusaks.tpsuara_id')
        ->leftJoin('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
        ->leftJoin('desas', 'tpsuaras.desa_id', '=', 'desas.id')
        ->leftJoin('kecamatans', 'desas.kecamatan_id', '=', 'kecamatans.id')
        ->where('tpsuaras.id', '=', $tpsuara->id)
        ->first();

        return Inertia::render('SuaraMasuk/Index', [
            'partai' => $partai,
            'tahun' => $tahun,
            'pemilu' => SuaraMasukResource::collection($pemilu),
            'menutps' => MenuTpsuaraResource::collection($menutps),
            'tps' => new InfoTpsResource($tps),
        ]);
    }

    public function approve_suara(Request $request, Partai $partai, string $tahun, CalonTpsuara $calonTpsuara)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }


        try {
                
            $calonTpsuara->update(
                [
                    'user_verified' => $request->user()->id,
                    'is_verified_at' => now(),
                ]
            );
    
            cache()->forget('jumlah_suara_global');
        
            broadcast(new SuaraMasuk('suara-masuk'))->toOthers();
            
            return back()->with([
                'type' => 'success',
                'message' => 'Suara berhasil diapprove',
            ]);
            
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            ]);
        }
    }

    public function update_suara(VerifikasiSuaraRequest $request, Partai $partai, string $tahun, CalonTpsuara $calonTpsuara)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        try {
                
            $calonTpsuara->update(
                $request->validated()
            );

            return back()->with([
                'type' => 'success',
                'message' => 'Suara berhasil diupdate',
            ]);

            cache()->forget('jumlah_suara_global');
        
            broadcast(new SuaraMasuk('suara-masuk'))->toOthers();
            
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            ]);
        }
    }


    public function update_suara_rusak(UpdateSuaraRusakRequest $request, Partai $partai, string $tahun, Suararusak $suararusak)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        try {
            $suararusak->update(
                [   
                    'user_verified' => $request->user()->id,
                    'suara_rusak' => $request->filled('suara_rusak') ? $request->suara_rusak : '0',
                    'is_verified_at' => now(),
                ]
            );

            return back()->with([
                'type' => 'success',
                'message' => 'Jumlah suara rusak berhasil diupdate',
            ]);

            cache()->forget('jumlah_suara_global');
        
            broadcast(new SuaraMasuk('suara-masuk'))->toOthers();
    
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            ]);
        }
    }



    public function download_dokumen(Partai $partai, string $tahun, Dokumentpsuara $dokumentpsuara, Request $request)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }

        $file = storage_path("app/public/{$dokumentpsuara->files}");

        if (file_exists($file)) {
            return response()->make(file_get_contents($file, $dokumentpsuara->nameoriginalfiles), 200, [
                'Content-Type' => $dokumentpsuara->extentionfiles,
                'Content-Disposition' => 'inline; filename="'.$dokumentpsuara->nameoriginalfiles.'"'
            ]);
        }
        abort(404);
    }

    public function destroy_dokumen(Partai $partai, string $tahun, Dokumentpsuara $dokumentpsuara, Request $request)
    {
        if(Gate::denies('operator-partai', [$partai, $request])) {
            abort(403);
        }
        
        try {
            $file = storage_path("app/public/{$dokumentpsuara->files}");

            $dokumentpsuara->delete();

            if (file_exists($file)) {
                Storage::delete($dokumentpsuara->files);
            }

            return back()->with([
                'type' => 'success',
                'message' => 'File berhasil dihapus',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'File gagal dihapus',
            ]);
        }
    }

}

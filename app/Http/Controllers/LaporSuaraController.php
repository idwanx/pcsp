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
use App\Models\Dokumentpsuara;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Resources\LaporSuara\PemiluResource;
use App\Http\Resources\LaporSuara\TpsuaraResource;
use App\Http\Requests\LaporSuara\StoreSuaraRequest;
use App\Http\Resources\LaporSuara\SuaraCalonResource;
use App\Http\Requests\LaporSuara\UploadDokumenRequest;
use App\Http\Requests\LaporSuara\StoreSuaraRusakRequest;
use Illuminate\Contracts\Database\Eloquent\Builder as MyBuilder;

class LaporSuaraController extends Controller
{
    public function dashboard(Partai $partai, Request $request): Response
    {
        // if(Gate::denies('saksi-partai', [$partai, $request])) {
        //     abort(403);
        // }
        
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::whereHas('dapilTpsuara', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', $partai->id)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('tahun', '=', $tahun)->get();
        
        return Inertia::render('LaporSuara/Dashboard', [
            'partai' => $partai,
            'tahun' => $tahun,
            'menupemilu' => PemiluResource::collection($menupemilu),
        ]);
    }

    public function pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Request $request)
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $dapil = Dapil::whereHas('tpsuaras', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', $partai->id)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('pemilu_id', '=', $pemilu->id)->first();

        return Redirect::route('laporsuara.suarapemilu', [
            'partai' => $partai, 
            'tahun' => $tahun, 
            'pemilu' => $pemilu->id, 
            'dapil' => $dapil->id
        ]);
    }

    public function suara_pemilu(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request): Response
    {
        if(Gate::denies('saksi-akses-lapor', [$partai, $pemilu, $request])) {
            abort(403);
        }


        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::whereHas('dapilTpsuara', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', $partai->id)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('tahun', '=', $tahun)->get();

        $menudapil = Dapil::whereHas('tpsuaras', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', $partai->id)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('pemilu_id', '=', $pemilu->id)->get();


        $tpsuara = Tpsuara::query()->select(['tpsuaras.id', 'kecamatans.nama_kecamatan', 'desas.nama_desa', 'tpsuaras.nama_tpsuara', 'tpsuaras.jlh_pemilih'])
        ->withCount([
            'calontpsuaras' => function (Builder $query) use($partai, $request) {
                $query->leftJoin('role_user', 'calon_tpsuara.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(calon_tpsuara.jlh_suara_tps),0)'))
                        ->where('role_user.partai_id', '=', $partai->id)
                        ->where('role_user.user_id', $request->user()->id);
            },
        ])
        ->withCount([
            'suararusaks' => function (Builder $query) use($partai, $request) {
                $query->leftJoin('role_user', 'suararusaks.tpsuara_id', '=', 'role_user.tpsuara_id')
                        ->select(DB::raw('COALESCE(sum(suararusaks.suara_rusak),0)'))
                        ->where('role_user.partai_id', '=', $partai->id)
                        ->where('role_user.user_id', $request->user()->id);
            },
        ])
        ->leftJoin('desas', 'tpsuaras.desa_id', '=', 'desas.id')
        ->leftJoin('kecamatans', 'desas.kecamatan_id', '=', 'kecamatans.id')
        ->whereHas('roleuser', function($query) use($partai, $request) {
            $query->where('role_user.partai_id', '=', $partai->id)->where('role_user.user_id', $request->user()->id);
        })
        ->with('dokumentpsuaras')
        ->where('tpsuaras.dapil_id', $dapil->id);


        return Inertia::render('LaporSuara/SuaraPemilu', [
            'partai' => $partai,
            'tahun' => $tahun,
            'dapil' => $dapil,
            'menudapil' => $menudapil,
            'pemilu' => new PemiluResource($pemilu),
            'menupemilu' => PemiluResource::collection($menupemilu),
            'tpsuara' => TpsuaraResource::collection($tpsuara->paginate(100)->withQueryString()),
            
        ]);
    }

    public function kandidat(Partai $partai, Dapil $dapil, Tpsuara $tpsuara, Request $request)
    {
        if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
            abort(403);
        }

        $dataKandidat = Calon::select(['calons.id', 'calons.foto', 'calons.no_urut', 'users.name', 'partais.nama_partai', 'partais.warna'])
        ->with([
            'calontpsuaras' => function (MyBuilder $query) use($partai, $tpsuara, $request) {
                $query->leftJoin('role_user', 'calon_tpsuara.user_id', '=', 'role_user.user_id')
                        ->where('role_user.user_id', $request->user()->id)
                        ->where('role_user.partai_id', $partai->id)
                        ->where('calon_tpsuara.tpsuara_id', '=', $tpsuara->id);
            },
        ])
        ->leftJoin('users', 'calons.user_id', '=', 'users.id')
        ->leftJoin('partais', 'calons.partai_id', '=', 'partais.id')
        ->where('calons.dapil_id', '=', $dapil->id)
        ->get();

        
        return response()->json([
            'dataKandidat' => SuaraCalonResource::collection($dataKandidat),
        ]);
    }

    public function store_suara(Partai $partai, string $tahun, Tpsuara $tpsuara, StoreSuaraRequest $request)
    {
        if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
            abort(403);
        }

        $find = CalonTpsuara::where([
            ['calon_id', '=', $request->calon_id],
            ['tpsuara_id', '=', $request->tpsuara_id],
            ['user_id', '=', $request->user()->id],
        ])->first();

        if($find == null || $find->is_verified_at === null) {

            try {
                
                CalonTpsuara::updateOrCreate(
                    ['calon_id' => $request->calon_id, 'tpsuara_id' => $request->tpsuara_id, 'user_id' => $request->user()->id],
                    ['jlh_suara_tps' => $request->filled('jlh_suara_tps') ? $request->jlh_suara_tps : '0'], ['jlh_suara_tps']
                );
    
                cache()->forget('jumlah_suara_global');

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
            
        } else {
            return back()->with([
                'type' => 'error',
                'message' => 'Data tidak ditemukan atau Jumlah suara telah disetujui',
            ]);
        }
    }

    public function store_suara_rusak(Partai $partai, string $tahun, Tpsuara $tpsuara, StoreSuaraRusakRequest $request)
    {
        if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
            abort(403);
        }

        $suaramasuk = Suararusak::updateOrCreate(
            ['user_id' => $request->user()->id, 'tpsuara_id' => $request->tpsuara_id],
            ['suara_rusak' => $request->filled('suara_rusak') ? $request->suara_rusak : '0'], ['suara_rusak']
        );

        return back()->with([
            'type' => 'success',
            'message' => 'Jumlah suara rusak berhasil dikirim',
        ]);
        
        // cache()->forget('jumlah_suara_global');

        // if($suaramasuk) {
        //     broadcast(new SuaraMasuk('suara-masuk'))->toOthers();
        // }
    }

    public function upload_dokumen(UploadDokumenRequest $request, Partai $partai, string $tahun, Tpsuara $tpsuara)
    {
        if(Gate::denies('saksi-akses-tps', [$partai, $tpsuara, $request])) {
            abort(403);
        }

        $tpsuara->dokumentpsuaras()->create([
            'keterangan' => $request->keterangan,
            'files' => $request->file('files')->store('dokumens_tps/'.$tahun.''),
            'nameoriginalfiles' => $request->file('files')->getClientOriginalName(),
            'extentionfiles' => $request->file('files')->getMimeType(),
            'user_id' => $request->user()->id,
        ]);

        return back()->with([
            'type' => 'success',
            'message' => 'Dokumen berhasil diupdate',
        ]);
    }

    public function download_dokumen(Partai $partai, string $tahun, Dokumentpsuara $dokumentpsuara, Request $request)
    {
        if(Gate::denies('saksi-akses-dokumen', [$dokumentpsuara, $request])) {
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
        if(Gate::denies('saksi-akses-dokumen', [$dokumentpsuara, $request])) {
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



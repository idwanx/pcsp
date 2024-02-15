<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Calon;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\CalonTpsuara;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Database\Eloquent\Builder as MyBuilder;
use App\Http\Resources\RekapSuaraPartai\RekapSuaraPartaiResource;

class RekapSuaraPartaiController extends Controller
{
    public function index(Partai $partai, Request $request)
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $pemilu = Pemilu::where('is_partai', '=', 1)->where('tahun', '=', $tahun)->min('id');

        return Redirect::route('rekapsuarapartai.rekap', ['partai' => $partai, 'tahun' => $tahun, 'pemilu' =>  $pemilu]);
    }

    public function rekap(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request): Response
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::where('is_partai', '=', 1)->where('tahun', '=', $tahun)->get();

        $totalpemilih = Dapil::withCount([
            'tpsuaras as total_pemilih' => function (Builder $query) {
                $query->select(DB::raw('COALESCE(sum(jlh_pemilih),0)'));
            },
        ])
        ->where('pemilu_id', '=', $pemilu->id)
        ->when(request('wilayah'), function ($q) use ($request) {
            return $q->where('dapils.id', $request->wilayah);
        })
        ->get();


        $partais = Partai::has('calons')
        ->withCount([
            'calonTpsuaras as jumlah_suara' => function (Builder $q) use ($pemilu, $request) {
                $q->select(DB::raw('COALESCE(sum(jlh_suara_tps),0)'))
                ->join('dapils', 'calons.dapil_id', '=', 'dapils.id')
                ->where('dapils.pemilu_id', $pemilu->id)
                ->when(request('wilayah'), function ($q) use ($request) {
                    return $q->where('dapils.id', $request->wilayah);
                });
            }
        ])
        ->orderBy('jumlah_suara', 'desc')
        ->get();


        $dapils = Dapil::where('pemilu_id', $pemilu->id)->get();



        
        
        return Inertia::render('RekapSuaraPartai/Rekap', [
            'partai' => $partai,
            'tahun' => $tahun,
            'menupemilu' => RekapSuaraPartaiResource::collection($menupemilu),
            'filtered' => $request->only(['wilayah']),
            'pemilu' => $pemilu,
            'partais' => $partais,
            'dapils' => $dapils,
            'totalpemilih' => $totalpemilih,
            
        ]);
    }

    public function get_calon(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request)
    {
        // return dd($request->filled('wilayah'));


        $datacalon = Calon::select(['calons.id', 'calons.foto', 'users.name', 'partais.nama_partai', 'partais.warna'])
        ->withCount([
            'calontpsuaras' => function (Builder $query) use($partai, $pemilu, $request) {
                $query->select(DB::raw('COALESCE(sum(jlh_suara_tps),0)'))
                // ->join('dapils', 'calons.dapil_id', '=', 'dapils.id')
                // ->where('dapils.pemilu_id', $pemilu->id)
                // ->when(request('wilayah'), function ($q) use ($request) {
                //     return $q->where('dapils.id', $request->wilayah);
                // })
                ;
            },
        ])
        ->join('dapils', 'calons.dapil_id', '=', 'dapils.id')
        ->leftJoin('partais', 'calons.partai_id', '=', 'partais.id')
        ->leftJoin('users', 'calons.user_id', '=', 'users.id')
        ->when($request->filled('wilayah'), function ($q) use ($request, $partai, $pemilu) {
            return $q->where('calons.dapil_id', $request->wilayah)->where('calons.partai_id', '=', $partai->id)->where('dapils.pemilu_id', $pemilu->id);
        }, function ($q) use ($partai, $pemilu) {
            return $q->where('calons.partai_id', '=', $partai->id)->where('dapils.pemilu_id', $pemilu->id);
        })
        ->orderBy('calontpsuaras_count', 'desc')
        ->get();
        
        return response()->json([
            'datacalon' => $datacalon,
        ]);
    }
}

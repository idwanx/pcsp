<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Calon;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Database\Eloquent\Builder as MyBuilder;

class PerolehanKursiController extends Controller
{
    public function index(Partai $partai, Request $request)
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $pemilu = Pemilu::where('is_partai', '=', 1)->where('tahun', '=', $tahun)->min('id');

        return Redirect::route('perolehankursi.rekap', ['partai' => $partai, 'tahun' => $tahun, 'pemilu' =>  $pemilu]);
    }

    public function rekap(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request): Response
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $menupemilu = Pemilu::where('is_partai', '=', 1)->where('tahun', '=', $tahun)->get();

        $partais = Partai::with(['calons' => function (MyBuilder $query) use ($pemilu, $request) {
            $query->with('user')
            ->withCount([
                'calontpsuaras' => function (Builder $query) {
                    $query->select(DB::raw('COALESCE(sum(jlh_suara_tps),0)'));
                },
            ])
            ->join('dapils', 'calons.dapil_id', '=', 'dapils.id')
                ->where('dapils.pemilu_id', $pemilu->id)
                ->when(request('wilayah'), function ($q) use ($request) {
                    return $q->where('dapils.id', $request->wilayah);
                })
            ->orderBy('calontpsuaras_count', 'desc');
        }])
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
        ->withCount([
            'suarapartais as suara_partai' => function (Builder $q) use ($pemilu, $request) {
                $q->select(DB::raw('COALESCE(sum(jlh_suara),0)'))
                ->join('tpsuaras', 'suarapartais.tpsuara_id', '=', 'tpsuaras.id')
                ->join('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
                ->where('dapils.pemilu_id', $pemilu->id)
                ->when(request('wilayah'), function ($q) use ($request) {
                    return $q->where('tpsuaras.dapil_id', $request->wilayah);
                });
            }
        ])
        ->whereNotIn('id', [25,27,28])
        ->orderBy('jumlah_suara', 'desc')
        ->get();


        $hasil[] = [];
        foreach ($partais as $key => $value) {
            $hasil[$key] = [

                    'n1'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/1,
                        'calons' => $value->calons,
                    ],
                    'n3'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/3,
                        'calons' => $value->calons,
                    ],
                    'n5'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/5,
                        'calons' => $value->calons,
                    ],
                    'n7'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/7,
                        'calons' => $value->calons,
                    ],
                    'n9'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/9,
                        'calons' => $value->calons,
                    ],
                    'n11'=> [
                        'id' => $value->id,
                        'logo' => $value->logo,
                        'partai' => $value->nama_partai,
                        'nilai' => ($value->jumlah_suara+$value->suara_partai)/11,
                        'calons' => $value->calons,
                    ],
            ];
        }

        $dapils = Dapil::where('pemilu_id', $pemilu->id)->get();

        return Inertia::render('PerolehanKursi/Rekap', [
            'partai' => $partai,
            'tahun' => $tahun,
            'partais' => $partais,
            'menupemilu' => $menupemilu,
            'filtered' => $request->only(['wilayah']),
            'pemilu' => $pemilu,
            'dapils' => $dapils,
            'hasil' => request('wilayah') ? $hasil : $hasil = [],
        ]);
    }

    public function get_calon(Partai $partai, string $tahun, Pemilu $pemilu, Dapil $dapil, Request $request)
    {

        $datacalon = Calon::select(['calons.id', 'calons.foto', 'users.name', 'partais.nama_partai', 'partais.warna'])
        ->withCount([
            'calontpsuaras' => function (Builder $query) use($partai, $pemilu, $request) {
                $query->select(DB::raw('COALESCE(sum(jlh_suara_tps),0)'))
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

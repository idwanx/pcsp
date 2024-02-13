<?php

namespace App\Http\Controllers\Api;

use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\PemiluApiResource;
use App\Http\Resources\Api\TpsApiResource;

class TpsApiController extends Controller
{
    public function get_pemilu(Partai $partai, Request $request)
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $pemilu = Pemilu::whereHas('dapilTpsuara', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', $partai->id)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('tahun', '=', $tahun)->get();
        
        return response()->json([
            'pemilu' => PemiluApiResource::collection($pemilu),
        ]);
    }

    public function get_tps(Partai $partai, Pemilu $pemilu, Request $request)
    {
        $tps = Tpsuara::select(['tpsuaras.id', 'tpsuaras.nama_tpsuara', 'tpsuaras.jlh_pemilih', 'dapils.nama_dapil', 'desas.nama_desa', 'pemilus.nama_pemilu'])
        ->whereHas('roleusers',  function ($query) use ($partai, $request) {
            $query->where([
                'partai_id' => $partai->id,
                'user_id' => $request->user()->id
            ]);
        })
        ->leftJoin('desas', 'tpsuaras.desa_id', '=', 'desas.id')
        ->leftJoin('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->where('pemilus.id', '=', $pemilu->id)
        ->get();
        
        return response()->json([
            'tps' => TpsApiResource::collection($tps),
        ]);
    }
}

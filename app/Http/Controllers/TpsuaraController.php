<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\Desa;
use Inertia\Inertia;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Tpsuara;
use Illuminate\Http\Request;
use App\Http\Requests\DataPemilu\TpsuaraRequest;
use App\Http\Resources\DataPemilu\DapilResource;
use App\Http\Resources\DataPemilu\TpsuaraResource;

class TpsuaraController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tps = Tpsuara::query()->select('tpsuaras.id', 'tpsuaras.desa_id', 'tpsuaras.dapil_id', 'tpsuaras.jlh_pemilih', 'desas.nama_desa', 'tpsuaras.nama_tpsuara', 'pemilus.nama_pemilu', 'pemilus.tahun', 'dapils.nama_dapil')
        ->leftJoin('dapils', 'tpsuaras.dapil_id', '=', 'dapils.id')
        ->leftJoin('desas', 'tpsuaras.desa_id', '=', 'desas.id')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->orderBy('id', 'asc');

        $dapil = Dapil::select('dapils.id', 'pemilus.nama_pemilu', 'pemilus.tahun', 'dapils.nama_dapil')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->orderBy('id', 'asc')->get();
        
        return Inertia::render('DataPemilu/Tps', [
            'tps' => TpsuaraResource::collection($tps->paginate(200)->withQueryString()),
            'dapils' => DapilResource::collection($dapil),
            'desas' => Desa::select('id', 'nama_desa')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TpsuaraRequest $request, Tpsuara $tpsuara)
    {
        $tpsuara->create(
            $request->validated()
        );

        return back()->with([
            'type' => 'success',
            'message' => 'TPS berhasil ditambahkan',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TpsuaraRequest $request, Tpsuara $tpsuara)
    {
        $tpsuara->update(
            $request->validated()
        );

        return back()->with([
            'type' => 'success',
            'message' => 'Tps berhasil diupdate',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tpsuara $tpsuara)
    {
        try {
            $tpsuara->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Tps berhasil dihapus',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Tps tidak bisa hapus karena terkait dengan data lain',
            ]);
        }
    }
}

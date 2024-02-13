<?php

namespace App\Http\Controllers;

use Throwable;
use Inertia\Inertia;
use App\Models\Calon;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\DataPemilu\CalonRequest;
use App\Http\Resources\DataPemilu\CalonResource;
use App\Http\Resources\DataPemilu\DapilResource;

class CalonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tps = Calon::query()->select('calons.id', 'calons.user_id', 'calons.no_urut', 'calons.partai_id', 'calons.dapil_id', 'calons.foto', 'users.name', 'partais.nama_partai', 'partais.logo', 'pemilus.nama_pemilu', 'pemilus.tahun', 'dapils.nama_dapil')
        ->leftJoin('users', 'calons.user_id', '=', 'users.id')
        ->leftJoin('partais', 'calons.partai_id', '=', 'partais.id')
        ->leftJoin('dapils', 'calons.dapil_id', '=', 'dapils.id')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->orderBy('id', 'desc');

        $dapil = Dapil::select('dapils.id', 'pemilus.nama_pemilu', 'pemilus.tahun', 'dapils.nama_dapil')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->orderBy('id', 'desc')->get();
        
        return Inertia::render('DataPemilu/Calon', [
            'calons' => CalonResource::collection($tps->paginate(20)->withQueryString()),
            'dapils' => DapilResource::collection($dapil),
            'partais' => Partai::select('id', 'nama_partai')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // idwan
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CalonRequest $request)
    {
        try {
            Calon::create([
                'user_id' => $request->user_id,
                'no_urut' => $request->no_urut,
                'partai_id' => $request->partai_id,
                'dapil_id' => $request->dapil_id,
                'foto' => $request->hasFile('foto') ? $request->file('foto')->store('foto_calons') : null,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Calon berhasil ditambahkan',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            ]);
        }
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
    public function update(CalonRequest $request, Calon $calon)
    {
        try {
            $calon->update([
                'user_id' => $request->user_id,
                'no_urut' => $request->no_urut,
                'partai_id' => $request->partai_id,
                'dapil_id' => $request->dapil_id,
                'foto' => $request->hasFile('foto') ? $request->file('foto')->store('foto_calons') : $calon->foto,
            ]);

            return back()->with([
                'type' => 'success',
                'message' => 'Calon berhasil diupdate',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Terjadi kesalahan, silahkan hubungi admin',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Calon $calon)
    {
        try {
            Storage::delete($calon->foto);
            $calon->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Calon berhasil dihapus',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Calon tidak bisa hapus karena terkait dengan data lain',
            ]);
        }
    }
}

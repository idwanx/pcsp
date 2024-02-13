<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPemilu\DapilRequest;
use Throwable;
use Inertia\Inertia;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Pemilu;
use Illuminate\Http\Request;
use App\Http\Resources\DataPemilu\DapilResource;

class DapilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $dapil = Dapil::query()
        ->select('dapils.id', 'dapils.pemilu_id', 'pemilus.nama_pemilu', 'pemilus.tahun', 'dapils.nama_dapil')
        ->leftJoin('pemilus', 'dapils.pemilu_id', '=', 'pemilus.id')
        ->orderBy('id', 'desc');
        
        return Inertia::render('DataPemilu/Dapil', [
            'dapil' => DapilResource::collection($dapil->paginate(20)->withQueryString()),
            'pemilus' => Pemilu::select('id', 'nama_pemilu', 'tahun')->orderBy('id', 'desc')->get(),
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
    public function store(DapilRequest $request, Dapil $dapil)
    {
        $dapil->create(
            $request->validated()
        );

        return back()->with([
            'type' => 'success',
            'message' => 'Pemilu berhasil ditambahkan',
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
    public function update(DapilRequest $request, Dapil $dapil)
    {
        $dapil->update(
            $request->validated()
        );

        return back()->with([
            'type' => 'success',
            'message' => 'Pemilu berhasil diupdate',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dapil $dapil)
    {
        try {
            $dapil->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Dapil berhasil dihapus',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Dapil tidak bisa hapus karena terkait dengan data lain',
            ]);
        }
    }
}

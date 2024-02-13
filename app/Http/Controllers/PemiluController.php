<?php

namespace App\Http\Controllers;

use App\Http\Requests\DataPemilu\PemiluRequest;
use Throwable;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use Illuminate\Http\Request;
use App\Http\Resources\DataPemilu\PemiluResource;

class PemiluController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $pemilu = Pemilu::query()->orderBy('id', 'desc');
        
        return Inertia::render('DataPemilu/Pemilu', [
            'pemilu' => PemiluResource::collection($pemilu->paginate(20)->withQueryString()),
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
    public function store(PemiluRequest $request, Pemilu $pemilu)
    {
        $pemilu->create(
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
    public function update(PemiluRequest $request, Pemilu $pemilu)
    {
        $pemilu->update(
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
    public function destroy(Pemilu $pemilu)
    {
        try {
            $pemilu->delete();

            return back()->with([
                'type' => 'success',
                'message' => 'Pemilu berhasil dihapus',
            ]);
        } catch (Throwable) {
            return back()->with([
                'type' => 'error',
                'message' => 'Pemilu tidak bisa hapus karena terkait dengan data lain',
            ]);
        }
    }
}

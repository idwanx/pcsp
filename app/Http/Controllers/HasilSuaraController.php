<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Partai;
use Illuminate\Http\Request;

class HasilSuaraController extends Controller
{
    public function dashboard(Partai $partai, Request $request): Response
    {
        if(is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        return Inertia::render('HasilSuara/Dashboard', [
            'partai' => $partai,
            'tahun' => $tahun,
        ]);
    }
}

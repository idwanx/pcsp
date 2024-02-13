<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Dapil;
use Inertia\Response;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use App\Models\RoleUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Api\PemiluApiResource;
use Illuminate\Contracts\Database\Eloquent\Builder;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Partai $partai, string $tahun, Pemilu $pemilu, Request $request): Response
    {
        if(is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        // $user_role = $user->roles()->get();

        // return dd($user_role);

        // $pemilu = Pemilu::whereHas('dapilTpsuara', function ($query) use($partai, $request) {
        //     $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
        //             ->where('role_user.partai_id', $partai->id)
        //             ->where('role_user.user_id', $request->user()->id);
        // })->where('tahun', '=', $tahun)->get();

        $menupemilu = Dapil::whereHas('tpsuaras', function ($query) use($partai, $request) {
            $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                    ->where('role_user.partai_id', 3)
                    ->where('role_user.user_id', $request->user()->id);
        })->where('pemilu_id', '=', 4)->first();

        return Inertia::render('Dashboard', [
            'partai' => $partai,
            'tahun' => $tahun,
            'user_role' => $menupemilu,
        ]);
    }
}

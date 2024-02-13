<?php

namespace App\Http\Controllers;

use App\Models\Pemilu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CheckAuthController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $roleUser = $request->user()->largestOrder()
        ->leftJoin('partais', 'role_user.partai_id', '=', 'partais.id')
        ->select('role_user.role_id', 'partais.alias')
        ->first();

        $tahunPemilu = Pemilu::max('tahun');

        // return dd(($roleUser->role_id == "1"));

        // if($roleUser->role_id == "1") {
            return Redirect::route('dashboard_admin');
        // } else {
            // return Redirect::route('dashboard_user', ['partai' => $roleUser->alias, 'tahun' => $tahunPemilu]);
        // }
    }
}

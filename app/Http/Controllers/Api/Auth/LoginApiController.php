<?php

namespace App\Http\Controllers\Api\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Api\UserApiResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginApiController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();
     
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Identitas tersebut tidak cocok dengan data kami.'],
            ]);
        }

        $token = $user->createToken($user->email)->plainTextToken;
        
        $userdata = $user->roles()->get();
        
        $partai = $user->largestOrder()
        ->leftJoin('partais', 'role_user.partai_id', '=', 'partais.id')
        ->select('role_user.role_id', 'partais.id as partai_id', 'partais.nama_partai', 'partais.alias', 'partais.logo', 'partais.warna')
        ->first();
        
        return [
            'user' => new UserApiResource($userdata),
            'token' => $token,
            'partai' => $partai,
        ];
    }
}

<?php

use App\Http\Controllers\Api\Auth\LoginApiController;
use App\Http\Controllers\Api\Auth\LogoutApiController;
use App\Http\Controllers\Api\TpsApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', LoginApiController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', LogoutApiController::class);

    Route::get('{partai}/{tahun}/pemilu', [TpsApiController::class, 'get_pemilu']);
    Route::get('{partai}/{pemilu}/tps', [TpsApiController::class, 'get_tps']);
    
});
<?php

use App\Http\Controllers\CalonController;
use App\Http\Controllers\CheckAuthController;
use App\Http\Controllers\DapilController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HasilSuaraController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InputSuaraController;
use App\Http\Controllers\LaporanSuaraController;
use App\Http\Controllers\LaporSuaraController;
use App\Http\Controllers\PemiluController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RekapSuaraPartaiController;
use App\Http\Controllers\SuaraMasukController;
use App\Http\Controllers\TpsuaraController;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', HomeController::class)->name('home');

Route::get('checkauth', CheckAuthController::class)->name('checkauth')->middleware(['auth', 'verified']);

Route::get('{partai}/{tahun}/user/dashboard', DashboardController::class)->name('dashboard.user')->middleware(['auth', 'verified']);

Route::get('admin/dashboard', DashboardAdminController::class)->name('dashboard.admin')->middleware(['auth', 'verified']);

Route::get('{partai}/{tahun}/hasilsuara/dashboard', [HasilSuaraController::class, 'dashboard'])->name('hasilsuara.dashboard')->middleware(['auth', 'verified']);

Route::get('calon/{partai}/{dapil}/{tpsuara}', [LaporSuaraController::class, 'kandidat'])->name('laporsuara.kandidat')->middleware(['auth', 'verified']);

Route::middleware(['auth', 'verified'])->group(function() {
    Route::scopeBindings()->prefix('{partai}/{tahun}/inputsuara')->group(function () {
        Route::get('dashboard', [InputSuaraController::class, 'dashboard'])->name('inputsuara.dashboard');
        Route::get('pemilu/{pemilu}', [InputSuaraController::class, 'pemilu'])->name('inputsuara.pemilu');
        Route::get('pemilu/{pemilu}/dapil/{dapil}', [InputSuaraController::class, 'suara_pemilu'])->name('inputsuara.suarapemilu');
        Route::get('kandidat/{dapil}/{tpsuara}', [InputSuaraController::class, 'kandidat'])->name('inputsuara.kandidat');
        
        Route::post('store/suara', [InputSuaraController::class, 'store_suara'])->name('inputsuara.storesuara');
        
        Route::post('storesuararusak/{tpsuara}', [InputSuaraController::class, 'store_suara_rusak'])->name('inputsuara.storesuararusak');
    });
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::scopeBindings()->prefix('{partai}/{tahun}/laporsuara')->group(function () {
        Route::get('dashboard', [LaporSuaraController::class, 'dashboard'])->name('laporsuara.dashboard');
        Route::get('pemilu/{pemilu}', [LaporSuaraController::class, 'pemilu'])->name('laporsuara.pemilu');
        Route::get('pemilu/{pemilu}/dapil/{dapil}', [LaporSuaraController::class, 'suara_pemilu'])->name('laporsuara.suarapemilu');
        Route::post('store/{tpsuara}', [LaporSuaraController::class, 'store_suara'])->name('laporsuara.storesuara');
        Route::post('storesuararusak/{tpsuara}', [LaporSuaraController::class, 'store_suara_rusak'])->name('laporsuara.storesuararusak');
        Route::post('uploaddokumen/{tpsuara}', [LaporSuaraController::class, 'upload_dokumen'])->name('laporsuara.uploaddokumen');
        Route::get('downloaddokumen/{dokumentpsuara}', [LaporSuaraController::class, 'download_dokumen'])->name('laporsuara.downloaddokumen');
        Route::delete('destroydokumen/{dokumentpsuara}', [LaporSuaraController::class, 'destroy_dokumen'])->name('laporsuara.destroydokumen');
    });
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::scopeBindings()->prefix('{partai}/{tahun}/suaramasuk')->group(function () {
        Route::get('check', [SuaraMasukController::class, 'check'])->name('suaramasuk.check');
        Route::get('/', [SuaraMasukController::class, 'index'])->name('suaramasuk.index');
        Route::get('{tpsuara}/tps', [SuaraMasukController::class, 'suara_masuk'])->name('suaramasuk.listsuara');
        Route::get('{calonTpsuara}/approvesuara', [SuaraMasukController::class, 'approve_suara'])->name('suaramasuk.approvesuara');
        Route::put('{calonTpsuara}/updatesuara', [SuaraMasukController::class, 'update_suara'])->name('suaramasuk.updatesuara');
        Route::get('downloaddokumen/{dokumentpsuara}', [SuaraMasukController::class, 'download_dokumen'])->name('suaramasuk.downloaddokumen');
        Route::delete('destroydokumen/{dokumentpsuara}', [SuaraMasukController::class, 'destroy_dokumen'])->name('suaramasuk.destroydokumen');
        Route::put('updatesuararusak/{suararusak}', [SuaraMasukController::class, 'update_suara_rusak'])->name('suaramasuk.updatesuararusak');
    });
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::scopeBindings()->prefix('{partai}/{tahun}/rekapsuarapartai')->group(function () {
        Route::get('indexrekapsuarapartai', [RekapSuaraPartaiController::class, 'index'])->name('rekapsuarapartai.index');
        Route::get('pemilu/{pemilu}', [RekapSuaraPartaiController::class, 'rekap'])->name('rekapsuarapartai.rekap');

        Route::get('getcalonpartai/{pemilu}', [RekapSuaraPartaiController::class, 'get_calon'])->name('rekapsuarapartai.getcalonpartai');
    });
});



Route::middleware(['auth', 'verified'])->group(function() {
    Route::scopeBindings()->prefix('{partai}/{tahun}/laporansuara')->group(function () {
        Route::get('dashboard', [LaporanSuaraController::class, 'dashboard'])->name('laporansuara.dashboard');
        Route::get('pemilu/{pemilu}', [LaporanSuaraController::class, 'pemilu'])->name('laporansuara.pemilu');
        Route::get('pemilu/{pemilu}/dapil/{dapil}', [LaporanSuaraController::class, 'suara_pemilu'])->name('laporansuara.suarapemilu');
        Route::get('kandidat/{tpsuara}', [LaporanSuaraController::class, 'kandidat'])->name('laporansuara.kandidat');
    });
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::prefix('datapemilu')->group(function () {
        Route::get('pemilu', [PemiluController::class, 'index'])->name('datapemilu.pemilu');
        Route::post('pemilu/store', [PemiluController::class, 'store'])->name('datapemilu.storepemilu');
        Route::put('pemilu/update/{pemilu}', [PemiluController::class, 'update'])->name('datapemilu.updatepemilu');
        Route::delete('pemilu/destroy/{pemilu}', [PemiluController::class, 'destroy'])->name('datapemilu.destroypemilu');

        Route::get('dapil', [DapilController::class, 'index'])->name('datapemilu.dapil');
        Route::post('dapil/store', [DapilController::class, 'store'])->name('datapemilu.storedapil');
        Route::put('dapil/update/{dapil}', [DapilController::class, 'update'])->name('datapemilu.updatedapil');
        Route::delete('dapil/destroy/{dapil}', [DapilController::class, 'destroy'])->name('datapemilu.destroydapil');

        Route::get('tps', [TpsuaraController::class, 'index'])->name('datapemilu.tps');
        Route::post('tps/store', [TpsuaraController::class, 'store'])->name('datapemilu.storetps');
        Route::put('tps/update/{tpsuara}', [TpsuaraController::class, 'update'])->name('datapemilu.updatetps');
        Route::delete('tps/destroy/{tpsuara}', [TpsuaraController::class, 'destroy'])->name('datapemilu.destroytps');

        Route::get('calon', [CalonController::class, 'index'])->name('datapemilu.calon');
        Route::post('calon/store', [CalonController::class, 'store'])->name('datapemilu.storecalon');
        Route::post('calon/update/{calon}', [CalonController::class, 'update'])->name('datapemilu.updatecalon');
        Route::delete('calon/destroy/{calon}', [CalonController::class, 'destroy'])->name('datapemilu.destroycalon');
    });
});
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit')->middleware(['auth', 'verified', 'password.confirm']);
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update')->middleware(['auth', 'verified']);
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy')->middleware(['auth', 'verified']);
Route::get('/password', [ProfileController::class, 'passwordEdit'])->name('password.edit')->middleware(['auth', 'verified']);


require __DIR__.'/auth.php';

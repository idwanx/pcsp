<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (is_numeric($request->tahun)) {
            $tahun = $request->tahun;
        } else {
            $tahun = 0;
        }

        $jumlahsuaraGlobal = DB::table('calon_tpsuara')
            ->select('calon_tpsuara.tpsuara_id', DB::raw('count(calon_tpsuara.id) as jlh_suara_masuk'))
            ->whereExists(function (Builder $query) use ($request) {
                $query->select(DB::raw(1))
                        ->from('role_user')
                        ->where('partai_id', '=', $request->partai->id ?? null)
                        ->whereColumn('role_user.user_id', 'calon_tpsuara.user_id');
            })
            ->where('calon_tpsuara.is_verified_at', '=', null)
            ->whereYear('calon_tpsuara.created_at', '=', $tahun)
            ->groupBy('calon_tpsuara.tpsuara_id')->get();
            
        return [
            ...parent::share($request),
            // 'auth' => [
            //     'user' => $request->user(),
            // ],
            'auth' => [
                // 'user' => $request->user()
                // ? $request->user()->only('name', 'email')
                // : null
                'user' => $request->user() ? $request->user()->load('largestOrder') : null,
                // 'partai' => $request->partai ? $request->partai : null,
                // 'tahun' => $request->tahun ? $request->tahun : null
            ],
            'jumlah_suara_global' => cache()->rememberForever('jumlah_suara_global', fn () => $jumlahsuaraGlobal),
            // 'jumlah_suara_global' => $jumlahsuaraGlobal,
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'flash' => [
                'type' => fn () => $request->session()->get('type'),
                'message' => fn () => $request->session()->get('message')
            ],
        ];
    }
}

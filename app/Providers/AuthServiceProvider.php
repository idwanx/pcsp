<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Models\Dapil;
use App\Models\Partai;
use App\Models\Pemilu;
use App\Models\Tpsuara;
use Illuminate\Http\Request;
use App\Models\Dokumentpsuara;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('operator-partai', function (User $user, Partai $partai, Request $request) {
            $user_role = $request->user()->roles()->whereIn('name_role', ['operator-partai'])->wherePivot('partai_id', $partai->id)->count();
            return $user_role > 0;
        });

        Gate::define('saksi-partai', function (User $user, Partai $partai, Request $request) {
            $user_role = $request->user()->roles()->whereIn('name_role', ['saksi-partai'])->wherePivot('partai_id', $partai->id)->count();
            return $user_role > 0;
        });


        Gate::define('saksi-akses-lapor', function (User $user, Partai $partai, Pemilu $pemilu, Request $request) {
            $dapils = Dapil::whereHas('tpsuaras', function ($query) use($partai, $request) {
                $query->leftJoin('role_user', 'tpsuaras.id', '=', 'role_user.tpsuara_id')
                        ->where('role_user.partai_id', $partai->id)
                        ->where('role_user.user_id', $request->user()->id);
            })->where('pemilu_id', '=', $pemilu->id)->count();

            return $dapils > 0;
        });


        Gate::define('saksi-akses-tps', function (User $user, Partai $partai, Tpsuara $tpsuara, Request $request) {
            $calon = Tpsuara::wherehas('roleuser', function ($query) use ($partai, $request) {
                $query->where([
                    'user_id' => $request->user()->id,
                    'partai_id' => $partai->id
                ]);
            })
            ->where('id', '=', $tpsuara->id)
            ->count();

            return $calon > 0;
        });

        Gate::define('saksi-akses-dokumen', function (User $user, Dokumentpsuara $dokumentpsuara, Request $request) {
            $dokumen = Dokumentpsuara::where([
                'id' => $dokumentpsuara->id,
                'user_id' => $request->user()->id
            ])->count();

            return $dokumen > 0;
        });




        

    }
}

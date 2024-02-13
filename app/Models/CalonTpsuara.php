<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class CalonTpsuara extends Pivot
{
    public function tpsuara(): BelongsTo
    {
        return $this->belongsTo(Tpsuara::class);
    }

    public function roleuser(): BelongsTo
    {
        return $this->belongsTo(RoleUser::class, 'user_id', 'user_id');
    }

    public function calon(): BelongsTo
    {
        return $this->belongsTo(Calon::class);
    }

    public function usercalon(): HasOneThrough
    {
        return $this->hasOneThrough(User::class, Calon::class, 'user_id', 'id', 'calon_id', 'user_id');
    }

    // public function suaramasuks(): HasManyThrough
    // {
    //     return $this->hasManyThrough(CalonTpsuara::class, RoleUser::class, 'tpsuara_id', 'user_id', 'id', 'user_id');
    // }
}

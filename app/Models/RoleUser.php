<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RoleUser extends Pivot
{
    public function partai(): BelongsTo
    {
        return $this->belongsTo(Partai::class, 'partai_id');
    }

    public function calontpsuaras(): HasMany
    {
        return $this->hasMany(CalonTpsuara::class, 'user_id', 'user_id');
    }

    public function tpsuara(): BelongsTo
    {
        return $this->belongsTo(Tpsuara::class, 'tpsuara_id', 'id');
    }

}

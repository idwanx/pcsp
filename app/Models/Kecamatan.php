<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Kecamatan extends Model
{
    use HasFactory;

    public function kabupaten(): BelongsTo
    {
        return $this->belongsTo(Kabupaten::class);
    }

    public function desaTpsuara(): HasOneThrough
    {
        return $this->hasOneThrough(Tpsuara::class, Desa::class);
    }

    public function desas(): HasMany
    {
        return $this->hasMany(Desa::class);
    }
}

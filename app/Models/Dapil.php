<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Dapil extends Model
{
    use HasFactory;

    protected $fillable = [
        'pemilu_id', 'nama_dapil'
    ];

    public function pemilu(): BelongsTo
    {
        return $this->belongsTo(Pemilu::class);
    }

    public function tpsuaras(): HasMany
    {
        return $this->hasMany(Tpsuara::class);
    }

    public function calons(): HasMany
    {
        return $this->hasMany(Calon::class);
    }

    public function calonTpsuaras(): HasOneThrough
    {
        return $this->hasOneThrough(CalonTpsuara::class, Tpsuara::class);
    }

    public function suaracalons(): HasOneThrough
    {
        return $this->hasOneThrough(CalonTpsuara::class, Calon::class);
    }

    public function suaraRusaks(): HasOneThrough
    {
        return $this->hasOneThrough(Suararusak::class, Tpsuara::class);
    }
}

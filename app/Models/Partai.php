<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Partai extends Model
{
    use HasFactory;

    public function getRouteKeyName(): mixed
    {
        return 'alias';
    }

    public function calons(): HasMany
    {
        return $this->hasMany(Calon::class);
    }

    public function dapilCalon(): HasOneThrough
    {
        return $this->hasOneThrough(Dapil::class, Calon::class, 'partai_id', 'id', 'id', 'dapil_id');
    }

    public function calonTpsuaras(): HasOneThrough
    {
        return $this->hasOneThrough(CalonTpsuara::class, Calon::class);
    }
}

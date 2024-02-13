<?php

namespace App\Models;

use App\Models\Dapil;
use App\Models\Tpsuara;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Pemilu extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_pemilu', 'tahun', 'icon'
    ];


    public function dapils(): HasMany
    {
        return $this->hasMany(Dapil::class);
    }

    public function dapilTpsuara(): HasOneThrough
    {
        return $this->hasOneThrough(Tpsuara::class, Dapil::class);
    }

    public function dapilTpsuaras(): HasManyThrough
    {
        return $this->hasManyThrough(Tpsuara::class, Dapil::class);
    }
}

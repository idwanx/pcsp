<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Calon extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'no_urut', 'partai_id', 'dapil_id', 'foto'
    ];

    // public function getPictureAttribute()
    // {
    //     return asset('storage/'.$this->foto);
    // }

    public function tpsuaras(): BelongsToMany
    {
        return $this->belongsToMany(Tpsuara::class);
    }

    public function dapil(): BelongsTo
    {
        return $this->belongsTo(Dapil::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function partai(): BelongsTo
    {
        return $this->belongsTo(Partai::class);
    }

    public function calontpsuaras(): HasOne
    {
        return $this->hasOne(CalonTpsuara::class, 'calon_id', 'id');
    }
}

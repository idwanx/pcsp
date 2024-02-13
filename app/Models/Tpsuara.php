<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Tpsuara extends Model
{
    use HasFactory;

    protected $fillable = [
        'dapil_id', 'desa_id', 'nama_tpsuara', 'jlh_pemilih'
    ];

    public function calons(): BelongsToMany
    {
        return $this->belongsToMany(Calon::class);
    }

    public function desa(): BelongsTo
    {
        return $this->belongsTo(Desa::class);
    }

    public function dapil(): BelongsTo
    {
        return $this->belongsTo(Dapil::class);
    }

    public function calontpsuara(): HasOne
    {
        return $this->hasOne(CalonTpsuara::class);
    }

    public function calontpsuaras(): HasMany
    {
        return $this->hasMany(CalonTpsuara::class);
    }

    public function suararusaks(): HasOne
    {
        return $this->hasOne(Suararusak::class);
    }

    public function roleuser(): HasOne
    {
        return $this->hasOne(RoleUser::class);
    }

    public function roleusers(): HasMany
    {
        return $this->hasMany(RoleUser::class);
    }

    public function suaramasuks(): HasManyThrough
    {
        return $this->hasManyThrough(CalonTpsuara::class, RoleUser::class, 'tpsuara_id', 'user_id', 'id', 'user_id');
    }

    public function dokumentpsuaras(): HasMany
    {
        return $this->hasMany(Dokumentpsuara::class);
    }

    public function pemilu(): HasOneThrough
    {
        return $this->hasOneThrough(Pemilu::class, Dapil::class, 'id', 'id', 'id', 'pemilu_id');


        // return $this->hasManyThrough(CalonTpsuara::class, RoleUser::class, 'tpsuara_id', 'user_id', 'id', 'user_id');
    }

    // public function desaKecamatan(): HasOneThrough
    // {
    //     return $this->hasOneThrough(Kecamatan::class, Desa::class, 'kecamatan_id', 'id', 'desa_id', 'kecamatan_id');
    // }

    // public function suarasah(): HasOneThrough
    // {
    //     return $this->hasOneThrough(CalonTpsuara::class, RoleUser::class, 'id', 'role_user_id');
    // }
}

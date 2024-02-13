<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Suararusak extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'tpsuara_id', 'suara_rusak', 'user_verified', 'is_verified_at'
    ];

    public function tpsuara(): BelongsTo
    {
        return $this->belongsTo(Tpsuara::class);
    }
}

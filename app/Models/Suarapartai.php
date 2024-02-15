<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Suarapartai extends Model
{
    use HasFactory;

    protected $fillable = [
        'partai_id', 'tpsuara_id', 'jlh_suara'
    ];

    public function partai(): BelongsTo
    {
        return $this->belongsTo(Partai::class);
    }
}

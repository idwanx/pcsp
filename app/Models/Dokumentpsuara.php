<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dokumentpsuara extends Model
{
    use HasFactory;

    protected $fillable = [
        'tpsuara_id', 'keterangan', 'files', 'nameoriginalfiles', 'extentionfiles', 'user_id', 'lock_at'
    ];

    public function tpsuara(): BelongsTo
    {
        return $this->belongsTo(Tpsuara::class);
    }
}

<?php

namespace App\Http\Resources\LaporSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalonSuaraTpsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'calon_id' => $this->calon_id,
            'tpsuara_id' => $this->tpsuara_id,
            'jlh_suara_tps' => $this->jlh_suara_tps,
            'user_id' => $this->user_id,
            'is_verified_at' => $this->is_verified_at,
        ];
    }
}

<?php

namespace App\Http\Resources\InputSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuaraCalonResource extends JsonResource
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
            'is_verified_at' => $this->is_verified_at,
            'jlh_suara_kpu' => $this->jlh_suara_kpu,
            'jlh_suara_tps' => $this->jlh_suara_tps,
        ];
    }
}

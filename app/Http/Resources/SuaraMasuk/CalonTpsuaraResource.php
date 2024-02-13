<?php

namespace App\Http\Resources\SuaraMasuk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalonTpsuaraResource extends JsonResource
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
            'jlh_suara_tps' => $this->jlh_suara_tps,
            'user_verified' => $this->user_verified,
            'calon' => $this->whenNotNull(new CalonResource($this->calon)),
        ];
    }
}

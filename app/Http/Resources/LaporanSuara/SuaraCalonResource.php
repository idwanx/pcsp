<?php

namespace App\Http\Resources\LaporanSuara;

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
        // return parent::toArray($request);
        return [
            'calon_id' => $this->calon_id,
            'name' => $this->name,
            'nama_partai' => $this->nama_partai,
            'warna' => $this->warna,
            'foto' => $this->foto,
            'calontpsuaras_count' => $this->whenNotNull($this->calontpsuaras_count),
            'jlh_suara_tps' => $this->whenNotNull($this->jlh_suara_tps),
        ];
    }
}

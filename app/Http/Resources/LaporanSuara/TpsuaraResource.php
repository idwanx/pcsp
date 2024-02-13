<?php

namespace App\Http\Resources\LaporanSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TpsuaraResource extends JsonResource
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
            'nama_kecamatan' => $this->nama_kecamatan,
            'nama_desa' => $this->nama_desa,
            'nama_tpsuara' => $this->nama_tpsuara,
            'jlh_pemilih' => $this->jlh_pemilih,
            'calontpsuaras_count' => $this->calontpsuaras_count,
            'suararusaks_count' => $this->suararusaks_count
        ];
    }
}

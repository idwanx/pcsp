<?php

namespace App\Http\Resources\SuaraMasuk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InfoTpsResource extends JsonResource
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
            'suararusak_id' => $this->suararusak_id,
            'jlh_pemilih' => $this->jlh_pemilih,
            'nama_desa' => $this->nama_desa,
            'nama_kecamatan' => $this->nama_kecamatan,
            'nama_tpsuara' => $this->nama_tpsuara,
            'suara_rusak' => $this->suara_rusak,
            'suara_sah' => $this->suara_sah,
            // 'dokumentpsuaras' => $this->dokumentpsuara,
            'dokumentpsuaras' => $this->whenNotNull(DokumenTpsResource::collection($this->dokumentpsuaras)),
        ];
    }
}

<?php

namespace App\Http\Resources\SuaraMasuk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuTpsuaraResource extends JsonResource
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
            'nama_tpsuara' => $this->nama_tpsuara,
            'nama_pemilu' => $this->nama_pemilu,
            // 'nama_desa' => $this->nama_desa,
            // 'nama_kecamatan' => $this->nama_kecamatan,
            'jlh_suara_masuk' => $this->jlh_suara_masuk,
        ];
    }
}
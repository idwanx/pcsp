<?php

namespace App\Http\Resources\DataPemilu;

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
            'dapil_id' => $this->dapil_id,
            'desa_id' => $this->desa_id,
            'tahun' => $this->tahun,
            'nama_pemilu' => $this->nama_pemilu,
            'nama_dapil' => $this->nama_dapil,
            'nama_tpsuara' => $this->nama_tpsuara,
            'nama_desa' => $this->nama_desa,
            'jlh_pemilih' => $this->jlh_pemilih,
        ];
    }
}

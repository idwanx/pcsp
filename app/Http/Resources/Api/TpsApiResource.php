<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TpsApiResource extends JsonResource
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
            'jlh_pemilih' => $this->jlh_pemilih,
            'nama_dapil' => $this->nama_dapil,
            'nama_desa' => $this->nama_desa,
            'nama_pemilu' => $this->nama_pemilu,
            'nama_tpsuara' => $this->nama_tpsuara,
            'tahun' => $this->tahun,
        ];
    }
}

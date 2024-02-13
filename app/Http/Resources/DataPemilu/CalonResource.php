<?php

namespace App\Http\Resources\DataPemilu;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalonResource extends JsonResource
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
            'user_id' => $this->user_id,
            'no_urut' => $this->no_urut,
            'partai_id' => $this->partai_id,
            'dapil_id' => $this->dapil_id,
            'foto' => $this->foto,
            'name' => $this->name,
            'nama_partai' => $this->nama_partai,
            'logo' => $this->logo,
            'nama_pemilu' => $this->nama_pemilu,
            'tahun' => $this->tahun,
            'nama_dapil' => $this->nama_dapil,
        ];
    }
}

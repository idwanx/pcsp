<?php

namespace App\Http\Resources\DataPemilu;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DapilResource extends JsonResource
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
            'pemilu_id' => $this->pemilu_id,
            'tahun' => $this->tahun,
            'nama_pemilu' => $this->nama_pemilu,
            'nama_dapil' => $this->nama_dapil,
        ];
    }
}

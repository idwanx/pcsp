<?php

namespace App\Http\Resources\SuaraMasuk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuaraMasukResource extends JsonResource
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
            'nama_pemilu' => $this->nama_pemilu,
            'tahun' => $this->tahun,
            'dapil_tpsuaras' => $this->whenNotNull(new DapilResource($this->dapilTpsuara)),
        ];
    }
}

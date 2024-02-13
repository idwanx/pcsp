<?php

namespace App\Http\Resources\SuaraMasuk;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DokumenTpsResource extends JsonResource
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
            'tpsuara_id' => $this->tpsuara_id,
            'keterangan' => $this->keterangan,
            'files' => $this->files,
        ];
    }
}

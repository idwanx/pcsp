<?php

namespace App\Http\Resources\LaporSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemiluResource extends JsonResource
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
            'tahun' => $this->tahun,
            'nama_pemilu' => $this->nama_pemilu,
            'icon' => $this->icon,
            'dapils' => DapilResource::collection($this->whenLoaded('dapils')),
        ];
    }
}

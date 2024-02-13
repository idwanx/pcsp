<?php

namespace App\Http\Resources\LaporSuara;

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
            'nama_dapil' => $this->nama_dapil,
        ];
    }
}

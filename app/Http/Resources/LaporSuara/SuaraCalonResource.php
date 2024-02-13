<?php

namespace App\Http\Resources\LaporSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuaraCalonResource extends JsonResource
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
            'calontpsuaras' => $this->whenNotNull(new CalonSuaraTpsResource($this->calontpsuaras)),
            'foto' => $this->foto,
            'name' => $this->name,
            'nama_partai' => $this->nama_partai,
            'no_urut' => $this->no_urut,
            'warna' => $this->warna,
        ];
    }
}

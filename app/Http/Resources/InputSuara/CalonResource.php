<?php

namespace App\Http\Resources\InputSuara;

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
            'foto' => $this->foto,
            'id' => $this->id,
            'nama_partai' => $this->nama_partai,
            'name' => $this->name,
            'no_urut' => $this->no_urut,
            'warna' => $this->warna,
            'calontpsuaras' => new SuaraCalonResource($this->calontpsuaras),
        ];
    }
}

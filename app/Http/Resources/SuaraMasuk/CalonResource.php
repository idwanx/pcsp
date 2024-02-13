<?php

namespace App\Http\Resources\SuaraMasuk;

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
        return parent::toArray($request);

        return [
            'foto' => $this->foto,
            'no_urut' => $this->no_urut,
            'user' => $this->whenNotNull(new UserResource($this->user)),
            'partai' => $this->whenNotNull(new PartaiResource($this->partai)),
        ];
    }
}

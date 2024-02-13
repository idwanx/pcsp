<?php

namespace App\Http\Resources\SuaraMasuk;

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
            'calontpsuaras' => $this->whenNotNull(CalonTpsuaraResource::collection($this->calontpsuaras)),
        ];
    }
}

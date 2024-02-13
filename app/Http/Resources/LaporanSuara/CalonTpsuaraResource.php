<?php

namespace App\Http\Resources\LaporanSuara;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalonTpsuaraResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return parent::toArray($request);
    }
}

<?php

namespace App\Http\Requests\LaporSuara;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuaraRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'calon_id' => ['required', 'exists:calons,id'],
            'tpsuara_id' => ['required', 'exists:tpsuaras,id'],
            'jlh_suara_tps' => ['nullable', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'calon_id.required' => 'Calon tidak valid',
            'calon_id.exists' => 'Calon tidak valid',
            'tpsuara_id.required' => 'TPS tidak valid',
            'tpsuara_id.exists' => 'TPS tidak valid',
            'jlh_suara_tps.integer' => 'Jumlah suara tidak valid',
        ];
    }
}

<?php

namespace App\Http\Requests\LaporSuara;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuaraRusakRequest extends FormRequest
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
            'tpsuara_id' => ['required', 'exists:tpsuaras,id'],
            'suara_rusak' => ['nullable', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'tpsuara_id.required' => 'TPS tidak valid',
            'tpsuara_id.exists' => 'TPS tidak valid',
            'suara_rusak.integer' => 'Jumlah suara tidak valid',
        ];
    }
}

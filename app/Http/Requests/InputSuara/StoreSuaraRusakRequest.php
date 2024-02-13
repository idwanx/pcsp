<?php

namespace App\Http\Requests\InputSuara;

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
            'suara_rusak' => ['required', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'suara_rusak.required' => 'Tidak boleh kosong',
            'suara_rusak.integer' => 'Jumlah suara tidak valid',
            'suara_rusak.min' => 'Minimal 0 (nol)',
        ];
    }
}

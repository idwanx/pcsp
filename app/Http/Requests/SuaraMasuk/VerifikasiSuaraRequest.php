<?php

namespace App\Http\Requests\SuaraMasuk;

use Illuminate\Foundation\Http\FormRequest;

class VerifikasiSuaraRequest extends FormRequest
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
            'jlh_suara_tps' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'jlh_suara_tps.required' => 'Jumlah suara harus diisi setidaknya bernilai 0 (Nol)',
            'jlh_suara_tps.integer' => 'Jumlah suara tidak valid',
        ];
    }
}

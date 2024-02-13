<?php

namespace App\Http\Requests\DataPemilu;

use Illuminate\Foundation\Http\FormRequest;

class PemiluRequest extends FormRequest
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
            'nama_pemilu' => ['required', 'string', 'max:100'],
            'tahun' => ['required','digits:4', 'integer', 'min:2024'],
            'icon' => ['required', 'string', 'max:10'],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_pemilu.required' => 'Nama Pemilu belum diisi',
            'nama_pemilu.string' => 'Nama Pemilu tidak valid',
            'nama_pemilu.max' => 'Nama Pemilu maksimal 100 karakter',
            'tahun.required' => 'Tahun belum diisi',
            'tahun.digits' => 'Maksimal tahun 4 angka',
            'tahun.min' => 'Minimal tahun 2022',
            'tahun.integer' => 'Tahun harus angka',

            'icon.required' => 'icon belum diisi',
            'icon.string' => 'icon tidak valid',
            'icon.max' => 'icon maksimal 100 karakter',
        ];
    }
}

<?php

namespace App\Http\Requests\DataPemilu;

use Illuminate\Foundation\Http\FormRequest;

class DapilRequest extends FormRequest
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
            'pemilu_id' => ['required', 'exists:pemilus,id'],
            'nama_dapil' => ['required', 'string', 'max:100'],
        ];
    }
    
    public function messages(): array
    {
        return [
            'pemilu_id.required' => 'Pemilu belum di pilih',
            'pemilu_id.exists' => 'Pemilu tidak valid',
            'nama_dapil.required' => 'Nama dapil belum diisi',
            'nama_dapil.string' => 'Nama dapil tidak valid',
            'nama_dapil.max' => 'Nama dapil maksimal 100 karakter',
        ];
    }
}

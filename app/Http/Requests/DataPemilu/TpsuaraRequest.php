<?php

namespace App\Http\Requests\DataPemilu;

use Illuminate\Foundation\Http\FormRequest;

class TpsuaraRequest extends FormRequest
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
            'dapil_id' => ['required', 'exists:dapils,id'],
            'desa_id' => ['required', 'exists:desas,id'],
            'nama_tpsuara' => ['required', 'string', 'max:100'],
            'jlh_pemilih' => ['required', 'integer'],
        ];
    }

    public function messages(): array
    {
        return [
            'dapil_id.required' => 'Dapil belum di pilih',
            'dapil_id.exists' => 'Dapil tidak valid',
            'desa_id.required' => 'Desa belum di pilih',
            'desa_id.exists' => 'Desa tidak valid',
            'nama_tpsuara.required' => 'Nama TPS dapil belum diisi',
            'nama_tpsuara.string' => 'Nama TPS tidak valid',
            'nama_tpsuara.max' => 'Nama TPS maksimal 100 karakter',
            'jlh_pemilih.required' => 'Jumlah Pemilih belum diisi',
            'jlh_pemilih.integer' => 'Jumlah Pemilih tidak valid',
        ];
    }
}

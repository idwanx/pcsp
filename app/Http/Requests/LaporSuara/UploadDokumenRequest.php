<?php

namespace App\Http\Requests\LaporSuara;

use Illuminate\Foundation\Http\FormRequest;

class UploadDokumenRequest extends FormRequest
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
            'keterangan' => ['required', 'string', 'max:100'],
            'files' => ['required', 'mimes:jpg,jpeg,png,pdf', 'file', 'max:10000'],
        ];
    }

    public function messages(): array
    {
        return [
            'keterangan.required' => 'Keterangan belum diisi.',
            'keterangan.string' => 'Keterangan tidak valid.',
            'keterangan.max' => 'Keterangan maksimal 100 karakter.',
            'files.required' => 'File belum dipilih.',
            'files.mimes' => 'Format File harus jpg,jpeg,png,pdf.',
            'files.max' => 'File maksimal 10 mb.',
        ];
    }
}

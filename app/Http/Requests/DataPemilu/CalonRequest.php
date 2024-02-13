<?php

namespace App\Http\Requests\DataPemilu;

use Illuminate\Foundation\Http\FormRequest;

class CalonRequest extends FormRequest
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
            'user_id' => ['required', 'exists:users,id'],
            'no_urut' => ['required', 'integer'],
            'partai_id' => ['required', 'exists:partais,id'],
            'dapil_id' => ['required', 'exists:dapils,id'],
            'foto' => ['nullable', 'mimes:jpg,jpeg,png,avif', 'file', 'max:2000'],
        ];
    }
}

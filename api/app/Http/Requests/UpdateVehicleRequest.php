<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateVehicleRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "nome" => ["sometimes", "required", "string", "min:1"],
            "marca" => ["sometimes", "required", "string", "min:1"],
            "modelo" => ["sometimes", "required", "string", "min:1"],
            "foto" => ["sometimes", "required", "string", "min:1"],
            "valor" => ["sometimes", "required", "numeric", "gt:0"]
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipamentoRequest extends FormRequest
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
            'patrimonio_id' => 'required|unique:equipamentos',
            'tipo' => 'required|in:tablet,notebook,desktop,monitor',
            'marca' => 'required',
            'modelo' => 'required',
            'observacoes' => 'nullable|string',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSolicitacaoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipo_equipamento' => 'required|string',
            'motivo' => 'required|string|max:255',
            'urgencia' => 'required|in:baixa,media,alta',
            'observacoes' => 'nullable|string',
        ];
    }
}

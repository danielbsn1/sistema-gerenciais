<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFuncionarioRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'cpf' => 'required|string|max:14|unique:funcionarios,cpf,'.$this->route('funcionario')->id,
            'setor' => 'required|string|max:100',
            'tipo' => 'nullable|in:interno,prefeitura',
            'email' => 'nullable|email|max:255',
            'telefone' => 'nullable|string|max:20',
            'cargo' => 'nullable|string|max:100',
            'endereco' => 'nullable|string|max:255',
            'cidade' => 'nullable|string|max:100',
            'uf' => 'nullable|string|max:2',
        ];
    }
}

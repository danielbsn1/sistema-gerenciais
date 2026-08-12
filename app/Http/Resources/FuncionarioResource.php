<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuncionarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'cpf' => $this->cpf,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'setor' => $this->setor,
            'cargo' => $this->cargo,
            'tipo' => $this->tipo,
            'ativo' => $this->ativo,
            'equipamento_atual' => $this->whenLoaded(
                'emprestimoAtivo',
                fn () => $this->emprestimoAtivo?->equipamento?->patrimonio_id,
            ),
        ];
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipamentoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'patrimonio_id' => $this->patrimonio_id,
            'tipo' => $this->tipo,
            'marca' => $this->marca,
            'modelo' => $this->modelo,
            'status' => $this->status,
            'observacoes' => $this->observacoes,
            'usuario_atual' => $this->whenLoaded(
                'emprestimoAtivo',
                fn () => $this->emprestimoAtivo?->funcionario?->nome,
            ),
        ];
    }
}

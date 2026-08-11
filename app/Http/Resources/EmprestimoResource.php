<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmprestimoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'observacoes' => $this->observacoes,
            'data_inicio' => $this->data_saida?->toISOString(),
            'data_saida' => $this->data_saida?->toISOString(),
            'data_devolucao' => $this->data_devolucao?->toISOString(),
            'setor' => $this->funcionario?->setor,
            'equipamento' => $this->whenLoaded('equipamento', fn () => EquipamentoResource::make($this->equipamento)->resolve()),
            'funcionario' => $this->whenLoaded('funcionario', fn () => FuncionarioResource::make($this->funcionario)->resolve()),
        ];
    }
}

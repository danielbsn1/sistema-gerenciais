<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitacaoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tipo_equipamento' => $this->tipo_equipamento,
            'motivo' => $this->motivo,
            'urgencia' => $this->urgencia,
            'observacoes' => $this->observacoes,
            'status' => $this->status,
            'created_at' => $this->created_at?->toISOString(),
            'user' => $this->whenLoaded('user', fn () => UserResource::make($this->user)->resolve()),
        ];
    }
}

<?php

namespace App\Notifications;

use App\Models\Solicitacao;
use Illuminate\Notifications\Notification;

class SolicitacaoStatusNotification extends Notification
{
    public function __construct(public readonly Solicitacao $solicitacao) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        $status = match($this->solicitacao->status) {
            'aprovada' => 'aprovada',
            'recusada' => 'recusada',
            default    => 'atualizada',
        };

        return [
            'tipo' => 'solicitacao',
            'solicitacao_id' => $this->solicitacao->id,
            'status' => $this->solicitacao->status,
            'mensagem' => "Sua solicitação de {$this->solicitacao->tipo_equipamento} foi {$status}.",
        ];
    }
}

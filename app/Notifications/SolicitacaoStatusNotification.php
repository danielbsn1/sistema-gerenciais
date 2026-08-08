<?php

namespace App\Notifications;

use App\Models\Solicitacao;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class SolicitacaoStatusNotification extends Notification
{
    public function __construct(public readonly Solicitacao $solicitacao) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $status = match($this->solicitacao->status) {
            'aprovada' => 'aprovada',
            'recusada' => 'recusada',
            default    => 'atualizada',
        };

        return (new MailMessage)
            ->subject("Solicitação {$status}")
            ->line("Sua solicitação de {$this->solicitacao->tipo_equipamento} foi {$status}.")
            ->line("Motivo: {$this->solicitacao->motivo}");
    }
}

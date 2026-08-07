<?php

namespace App\Notifications;

use App\Models\Solicitacao;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SolicitacaoStatusNotification extends Notification
{
    public function __construct(public Solicitacao $solicitacao) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $status = $this->solicitacao->status;
        $label = $status === 'aprovada' ? 'aprovada' : 'recusada';

        return (new MailMessage)
            ->subject("Sua solicitação foi {$label}")
            ->greeting("Olá, {$notifiable->name}!")
            ->line("Sua solicitação de **{$this->solicitacao->tipo_equipamento}** foi **{$label}**.")
            ->line("Motivo: {$this->solicitacao->motivo}")
            ->line("Urgência: {$this->solicitacao->urgencia}")
            ->line('Acesse o sistema para mais detalhes.');
    }
}

<?php

namespace App\Actions;

use App\Models\Solicitacao;
use App\Notifications\SolicitacaoStatusNotification;

class AvaliarSolicitacaoAction
{
    public function execute(Solicitacao $solicitacao, string $status): void
    {
        $solicitacao->update(['status' => $status]);
        $solicitacao->user->notify(new SolicitacaoStatusNotification($solicitacao));
    }
}
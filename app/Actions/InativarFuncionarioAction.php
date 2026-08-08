<?php

namespace App\Actions;

use App\Models\Funcionario;

class InativarFuncionarioAction
{
    public function execute(Funcionario $funcionario): bool
    {
        $funcionario->update(['ativo' => ! $funcionario->ativo]);

        return $funcionario->ativo;
    }
}
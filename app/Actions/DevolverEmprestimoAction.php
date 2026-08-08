<?php

namespace App\Actions;

use App\Models\Emprestimo;
use Illuminate\Support\Facades\DB;

class DevolverEmprestimoAction
{
    public function execute(Emprestimo $emprestimo): void
    {
        DB::transaction(function () use ($emprestimo) {
            $emprestimo->update([
                'status' => 'devolvido',
                'data_devolucao' => now(),
            ]);

            $emprestimo->equipamento->update(['status' => 'disponivel']);
        });
    }
}
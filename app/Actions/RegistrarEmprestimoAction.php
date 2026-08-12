<?php

namespace App\Actions;

use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class RegistrarEmprestimoAction
{
    public function execute(Equipamento $equipamento, Funcionario $funcionario, int $adminId, ?string $observacoes): Emprestimo
    {
        if (! $equipamento->isDisponivel()) {
            throw new RuntimeException('Equipamento não disponível.');
        }

        return DB::transaction(function () use ($equipamento, $funcionario, $adminId, $observacoes) {
            $emprestimo = Emprestimo::create([
                'equipamento_id' => $equipamento->id,
                'funcionario_id' => $funcionario->id,
                'admin_id' => $adminId,
                'data_saida' => now(),
                'status' => 'ativo',
                'observacoes' => $observacoes,
            ]);

            $equipamento->update(['status' => 'em_uso']);

            return $emprestimo;
        });
    }
}
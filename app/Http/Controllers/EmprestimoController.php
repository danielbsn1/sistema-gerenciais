<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // ✅ importante para Auth::id()
use App\Models\Equipamento;
use App\Models\Emprestimo;

class EmprestimoController extends Controller
{
    // Registra um empréstimo
    public function store(Request $request)
    {
        $equipamento = Equipamento::findOrFail($request->equipamento_id);

        // Verifica se está disponível
        if (!$equipamento->isDisponivel()) {
            return back()->withErrors(['equipamento_id' => 'Equipamento não disponível.']);
        }

        // Registra o empréstimo
        Emprestimo::create([
            'equipamento_id' => $request->equipamento_id,
            'funcionario_id' => $request->funcionario_id,
            'admin_id'      => Auth::id(), // ✅ aqui Intelephense não reclama
            'data_saida'    => now(),
            'status'        => 'ativo',
            'observacoes'   => $request->observacoes,
        ]);

        // Atualiza status do equipamento
        $equipamento->update(['status' => 'em_uso']);

        return redirect()->route('emprestimos.index')->with('success', 'Empréstimo registrado!');
    }

    // Devolução com um clique
    public function devolver(Emprestimo $emprestimo)
    {
        $emprestimo->update([
            'status'        => 'devolvido',
            'data_devolucao'=> now()
        ]);

        $emprestimo->equipamento->update(['status' => 'disponivel']);

        return back()->with('success', 'Devolução registrada!');
    }
}

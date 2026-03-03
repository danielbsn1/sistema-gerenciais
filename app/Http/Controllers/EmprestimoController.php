<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Equipamento;
use App\Models\Emprestimo;

class EmprestimoController extends Controller
{

    public function store(Request $request)
    {
        $equipamento = Equipamento::findOrFail($request->equipamento_id);


        if (!$equipamento->isDisponivel()) {
            return back()->withErrors(['equipamento_id' => 'Equipamento não disponível.']);
        }


        Emprestimo::create([
            'equipamento_id' => $request->equipamento_id,
            'funcionario_id' => $request->funcionario_id,
            'admin_id'      => Auth::id(),
            'status'        => 'ativo',
            'observacoes'   => $request->observacoes,
        ]);


        $equipamento->update(['status' => 'em_uso']);

        return redirect()->route('emprestimos.index')->with('success', 'Empréstimo registrado!');
    }


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

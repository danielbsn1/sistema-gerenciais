<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Inertia\Inertia;


class EmprestimoController extends Controller
{
    public function index(Request $request)
    {
        $query = Emprestimo::with(['equipamento', 'funcionario']);

        if ($request->status)      $query->where('status', $request->status);
        if ($request->tipo)        $query->whereHas('equipamento', fn($q) => $q->where('tipo', $request->tipo));
        if ($request->funcionario) $query->whereHas('funcionario', fn($q) =>
                                         $q->where('nome', 'like', "%{$request->funcionario}%"));

        $emprestimos = $query->latest()->get();
        return \Inertia\Inertia::render('Emprestimos/Index',
         ['emprestimos' => $emprestimos]);
    }

    public function create()
{
    $equipamentos = Equipamento::where('status', 'disponivel')->get();
    $funcionarios = Funcionario::all();

    return Inertia::render('Emprestimos/Create', [
        'equipamentos' => $equipamentos,
        'funcionarios' => $funcionarios,
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'equipamento_id' => 'required|exists:equipamentos,id',
            'funcionario_id' => 'required|exists:funcionarios,id',
        ]);

        $equipamento = Equipamento::findOrFail($request->equipamento_id);

        if (!$equipamento->isDisponivel()) {
            return back()->withErrors(['equipamento_id' => 'Equipamento não disponível.']);
        }

       Emprestimo::create([
    'equipamento_id' => $request->equipamento_id,
    'funcionario_id' => $request->funcionario_id,
     'admin_id' => 1,
    'data_saida'     => now(),
    'status'         => 'ativo',
    'observacoes'    => $request->observacoes,
]);

        $equipamento->update(['status' => 'em_uso']);

        return redirect()->route('emprestimos.index')->with('success', 'Empréstimo registrado!');
    }

    public function devolver(Emprestimo $emprestimo)
    {
        $emprestimo->update([
            'status'         => 'devolvido',
            'data_devolucao' => now(),
        ]);

        $emprestimo->equipamento->update(['status' => 'disponivel']);

        return back()->with('success', 'Devolução registrada!');
    }

     public function show(Emprestimo $emprestimo)
{
    $emprestimo->load([
        'equipamento',
        'funcionario',
    ]);

    return Inertia::render('Emprestimos/Show', [
        'emprestimo' => $emprestimo,
    ]);
}


















}
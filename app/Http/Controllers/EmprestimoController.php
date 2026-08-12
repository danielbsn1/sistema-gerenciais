<?php

namespace App\Http\Controllers;

use App\Actions\DevolverEmprestimoAction;
use App\Actions\RegistrarEmprestimoAction;
use App\Http\Requests\StoreEmprestimoRequest;
use App\Http\Resources\EmprestimoResource;
use App\Http\Resources\EquipamentoResource;
use App\Http\Resources\FuncionarioResource;
use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Inertia\Inertia;
use RuntimeException;

class EmprestimoController extends Controller
{
    public function index(Request $request)
    {
        $query = Emprestimo::with(['equipamento', 'funcionario']);

        if ($request->status)      $query->where('status', $request->status);
        if ($request->tipo)        $query->whereHas('equipamento', fn($q) => $q->where('tipo', $request->tipo));
        if ($request->funcionario) $query->whereHas('funcionario', fn($q) =>
                                         $q->where('nome', 'like', "%{$request->funcionario}%"));

        return Inertia::render('Emprestimos/Index', [
            'emprestimos' => EmprestimoResource::collection($query->latest()->get())->resolve(),
        ]);
    }

    public function create()
    {
        $equipamentos = Equipamento::where('status', 'disponivel')->get();
        $funcionarios = Funcionario::all();

        return Inertia::render('Emprestimos/Create', [
            'equipamentos' => EquipamentoResource::collection($equipamentos)->resolve(),
            'funcionarios' => FuncionarioResource::collection($funcionarios)->resolve(),
        ]);
    }

    public function store(StoreEmprestimoRequest $request)
    {
        try {
            app(RegistrarEmprestimoAction::class)->execute(
                Equipamento::findOrFail($request->equipamento_id),
                Funcionario::findOrFail($request->funcionario_id),
                $request->user()->id,
                $request->observacoes,
            );
        } catch (RuntimeException $e) {
            return back()->withErrors(['equipamento_id' => $e->getMessage()]);
        }

        return redirect()->route('emprestimos.index')->with('success', 'Empréstimo registrado!');
    }

    public function devolver(Emprestimo $emprestimo)
    {
        app(DevolverEmprestimoAction::class)->execute($emprestimo);

        return back()->with('success', 'Devolução registrada!');
    }

    public function edit(Emprestimo $emprestimo)
    {
        $emprestimo->load(['equipamento', 'funcionario']);

        return Inertia::render('Emprestimos/Edit', [
            'emprestimo' => EmprestimoResource::make($emprestimo)->resolve(),
        ]);
    }

    public function update(Request $request, Emprestimo $emprestimo)
    {
        $request->validate([
            'observacoes' => 'nullable|string',
            'data_devolucao' => 'nullable|date',
        ]);

        $emprestimo->update($request->only(['observacoes', 'data_devolucao']));

        return redirect()->route('emprestimos.show', $emprestimo)->with('success', 'Empréstimo atualizado!');
    }

    public function destroy(Emprestimo $emprestimo)
    {
        $emprestimo->equipamento->update(['status' => 'disponivel']);
        $emprestimo->delete();

        return redirect()->route('emprestimos.index')->with('success', 'Empréstimo removido!');
    }

    public function show(Emprestimo $emprestimo)
    {
        $emprestimo->load(['equipamento', 'funcionario']);

        return Inertia::render('Emprestimos/Show', [
            'emprestimo' => EmprestimoResource::make($emprestimo)->resolve(),
        ]);
    }
}

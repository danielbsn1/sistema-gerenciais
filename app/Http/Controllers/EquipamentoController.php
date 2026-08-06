<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use Illuminate\Http\Request;

class EquipamentoController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipamento::with('emprestimoAtivo.funcionario');

        if ($request->tipo) {
            $query->where('tipo', $request->tipo);
        }
        if ($request->status) {
            $query->where('status', $request->status);
        }
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('patrimonio_id', 'like', "%{$request->search}%")
                    ->orWhere('marca', 'like', "%{$request->search}%")
                    ->orWhere('modelo', 'like', "%{$request->search}%");
            });
        }

        $equipamentos = $query->orderBy('tipo')->get();

        return \Inertia\Inertia::render('Equipamentos/Index', [
            'equipamentos' => $equipamentos,

            'filters' => [
                'search' => $request->search,
                'tipo' => $request->tipo,
                'status' => $request->status,
            ],
        ]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Equipamentos/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'patrimonio_id' => 'required|unique:equipamentos',
            'tipo' => 'required|in:tablet,notebook,desktop,monitor',
            'marca' => 'required',
            'modelo' => 'required',
        ]);

        Equipamento::create($request->all());

        return redirect()->route('equipamentos.index')->with('success', 'Equipamento cadastrado!');
    }

    public function show(Equipamento $equipamento)
    {
        $historico = $equipamento->emprestimos()->with('funcionario')->latest()->get();

        return \Inertia\Inertia::render('Equipamentos/Show', ['equipamento' => $equipamento, 'historico' => $historico]);
    }

    public function edit(Equipamento $equipamento)
    {
        return \Inertia\Inertia::render('Equipamentos/Edit', ['equipamento' => $equipamento]);
    }

    public function mudarStatus(Request $request, Equipamento $equipamento)
    {
        $request->validate([
            'status' => 'required|in:disponivel,em_uso,manutencao,inativo',
        ]);

        $equipamento->update(['status' => $request->status]);

        return back()->with('success', 'Status atualizado');
    }

    public function update(Request $request, Equipamento $equipamento)
    {
        $request->validate([
            'patrimonio_id' => 'required|unique:equipamentos,patrimonio_id,'.$equipamento->id,
            'tipo' => 'required',
            'marca' => 'required',
            'modelo' => 'required',
        ]);

        $equipamento->update($request->all());

        return redirect()->route('equipamentos.show', $equipamento)->with('success', 'Atualizado!');
    }

    public function destroy(Equipamento $equipamento)
    {
        $equipamento->emprestimos()->delete();

        $equipamento->delete();

        return redirect()
            ->route('equipamentos.index')
            ->with('success', 'Equipamento removido!');
    }
}

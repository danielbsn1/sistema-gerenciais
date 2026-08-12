<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipamentoRequest;
use App\Http\Requests\UpdateEquipamentoRequest;
use App\Http\Resources\EmprestimoResource;
use App\Http\Resources\EquipamentoResource;
use App\Models\Equipamento;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipamentoController extends Controller
{
    public function index(Request $request)
    {
        $query = Equipamento::with('emprestimoAtivo.funcionario');

        if ($request->tipo)   $query->where('tipo', $request->tipo);
        if ($request->status) $query->where('status', $request->status);
        if ($request->search) $query->where(function($q) use ($request) {
            $q->where('patrimonio_id', 'like', "%{$request->search}%")
              ->orWhere('marca', 'like', "%{$request->search}%")
              ->orWhere('modelo', 'like', "%{$request->search}%");
        });

        return Inertia::render('Equipamentos/Index', [
            'equipamentos' => EquipamentoResource::collection($query->orderBy('tipo')->get())->resolve(),
            'filters' => [
                'search' => $request->search,
                'tipo' => $request->tipo,
                'status' => $request->status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Equipamentos/Create');
    }

    public function store(StoreEquipamentoRequest $request)
    {
        Equipamento::create($request->validated());

        return redirect()->route('equipamentos.index')->with('success', 'Equipamento cadastrado!');
    }

    public function show(Equipamento $equipamento)
    {
        $historico = $equipamento->emprestimos()->with('funcionario')->latest()->get();
        return Inertia::render('Equipamentos/Show', [
            'equipamento' => EquipamentoResource::make($equipamento)->resolve(),
            'historico' => EmprestimoResource::collection($historico)->resolve(),
        ]);
    }

    public function edit(Equipamento $equipamento)
    {
        return Inertia::render('Equipamentos/Edit', ['equipamento' => EquipamentoResource::make($equipamento)->resolve()]);
    }

    public function update(UpdateEquipamentoRequest $request, Equipamento $equipamento)
    {
        $equipamento->update($request->validated());

        return redirect()->route('equipamentos.show', $equipamento)->with('success', 'Atualizado!');
    }

    public function destroy(Equipamento $equipamento)
    {
        $equipamento->emprestimos()->delete();
        $equipamento->delete();

        return redirect()->route('equipamentos.index')->with('success', 'Equipamento removido!');
    }
}

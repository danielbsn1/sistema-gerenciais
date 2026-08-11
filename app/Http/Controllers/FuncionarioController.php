<?php

namespace App\Http\Controllers;

use App\Actions\InativarFuncionarioAction;
use App\Http\Requests\StoreFuncionarioRequest;
use App\Http\Requests\UpdateFuncionarioRequest;
use App\Http\Resources\EmprestimoResource;
use App\Http\Resources\FuncionarioResource;
use App\Models\Funcionario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FuncionarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Funcionario::with('emprestimoAtivo.equipamento');

        if ($request->search) $query->where(function($q) use ($request) {
            $q->where('nome', 'like', "%{$request->search}%")
              ->orWhere('cpf', 'like', "%{$request->search}%");
        });

        if ($request->setor) $query->where('setor', 'like', "%{$request->setor}%");
        if ($request->tipo)  $query->where('tipo', $request->tipo);

        return Inertia::render('Funcionarios/Index', [
            'funcionarios' => FuncionarioResource::collection($query->orderBy('nome')->get())->resolve(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Funcionarios/Create');
    }

    public function store(StoreFuncionarioRequest $request)
    {
        Funcionario::create($request->validated());

        return redirect()->route('funcionarios.index')->with('success', 'Funcionário cadastrado!');
    }

    public function show(Funcionario $funcionario)
    {
        $historico = $funcionario->emprestimos()->with('equipamento')->latest()->get();
        return Inertia::render('Funcionarios/Show', [
            'funcionario' => FuncionarioResource::make($funcionario)->resolve(),
            'historico' => EmprestimoResource::collection($historico)->resolve(),
        ]);
    }

    public function edit(Funcionario $funcionario)
    {
        return Inertia::render('Funcionarios/Edit', ['funcionario' => FuncionarioResource::make($funcionario)->resolve()]);
    }

    public function update(UpdateFuncionarioRequest $request, Funcionario $funcionario)
    {
        $funcionario->update($request->validated());

        return redirect()->route('funcionarios.show', $funcionario)->with('success', 'Atualizado!');
    }

    public function inativar(Funcionario $funcionario)
    {
        app(InativarFuncionarioAction::class)->execute($funcionario);
        $status = $funcionario->ativo ? 'ativado' : 'inativado';

        return back()->with('success', "Funcionário {$status}!");
    }

    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();
        return redirect()->route('funcionarios.index')->with('success', 'Removido!');
    }
}

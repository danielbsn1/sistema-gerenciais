<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Funcionario::with('emprestimoAtivo.equipamento');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nome', 'like', "%{$request->search}%")
                    ->orWhere('cpf', 'like', "%{$request->search}%");
            });
        }

        if ($request->setor) {
            $query->where('setor', 'like', "%{$request->setor}%");
        }
        if ($request->tipo) {
            $query->where('tipo', $request->tipo);
        }

        $funcionarios = $query->orderBy('nome')->get();

        return \Inertia\Inertia::render('Funcionarios/Index',
            ['funcionarios' => $funcionarios]);
    }

    public function create()
    {
        return \Inertia\Inertia::render('Funcionarios/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required|unique:funcionarios',
            'setor' => 'required',
        ]);

        Funcionario::create($request->all());

        return redirect()->route('funcionarios.index')->with('success', 'Funcionário cadastrado!');
    }

    public function show(Funcionario $funcionario)
    {
        $historico = $funcionario->emprestimos()->with('equipamento')->latest()->get();

        return \Inertia\Inertia::render('Funcionarios/Show', ['funcionario' => $funcionario, 'historico' => $historico]);
    }

    public function edit(Funcionario $funcionario)
    {
        return \Inertia\Inertia::render('Funcionarios/Edit', ['funcionario' => $funcionario]);
    }

    public function update(Request $request, Funcionario $funcionario)
    {
        $request->validate([
            'nome' => 'required',
            'cpf' => 'required|unique:funcionarios,cpf,'.$funcionario->id,
            'setor' => 'required',
        ]);

        $funcionario->update($request->all());

        return redirect()->route('funcionarios.show', $funcionario)->with('success', 'Atualizado!');
    }

    public function inativar(Funcionario $funcionario)
    {
        $funcionario->update(['ativo' => ! $funcionario->ativo]);
        $status = $funcionario->ativo ? 'ativado' : 'inativado';

        return back()->with('success', "Funcionário {$status}!");
    }

    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();

        return redirect()->route('funcionarios.index')->with('success', 'Removido!');
    }
}

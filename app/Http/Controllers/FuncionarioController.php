<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    public function index(Request $request)
    {
        $query = Funcionario::with('emprestimoAtivo.equipamento');

        if ($request->busca) $query->where(function($q) use ($request) {
            $q->where('nome', 'like', "%{$request->busca}%")
              ->orWhere('cpf', 'like', "%{$request->busca}%");
        });

        if ($request->setor) $query->where('setor', 'like', "%{$request->setor}%");
        if ($request->tipo)  $query->where('tipo', $request->tipo);

        $funcionarios = $query->orderBy('nome')->get();

        return view('funcionarios.index', compact('funcionarios'));
    }

    public function create()
    {
        return view('funcionarios.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome'  => 'required',
            'cpf'   => 'required|unique:funcionarios',
            'setor' => 'required',
        ]);

        Funcionario::create($request->all());

        return redirect()->route('funcionarios.index')->with('success', 'Funcionário cadastrado!');
    }

    public function show(Funcionario $funcionario)
    {
        $historico = $funcionario->emprestimos()->with('equipamento')->latest()->get();
        return view('funcionarios.show', compact('funcionario', 'historico'));
    }

    public function edit(Funcionario $funcionario)
    {
        return view('funcionarios.edit', compact('funcionario'));
    }

    public function update(Request $request, Funcionario $funcionario)
    {
        $request->validate([
            'nome'  => 'required',
            'cpf'   => 'required|unique:funcionarios,cpf,' . $funcionario->id,
            'setor' => 'required',
        ]);

        $funcionario->update($request->all());

        return redirect()->route('funcionarios.show', $funcionario)->with('success', 'Atualizado!');
    }

    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();
        return redirect()->route('funcionarios.index')->with('success', 'Removido!');
    }
}
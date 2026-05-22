@extends('layouts.app')
@section('titulo', 'Funcionários')

@section('content')

<div class="bg-white rounded-xl shadow-sm p-5 mb-6">
    <form method="GET" class="flex flex-wrap gap-3 items-end">
        <div>
            <label class="text-xs text-gray-500 block mb-1">Buscar</label>
            <input name="busca" value="{{ request('busca') }}" placeholder="Nome, CPF..."
                   class="border rounded-lg px-3 py-2 text-sm w-56 outline-none">
        </div>
        <div>
            <label class="text-xs text-gray-500 block mb-1">Setor</label>
            <input name="setor" value="{{ request('setor') }}" placeholder="Ex: Campo"
                   class="border rounded-lg px-3 py-2 text-sm w-40 outline-none">
        </div>
        <div>
            <label class="text-xs text-gray-500 block mb-1">Tipo</label>
            <select name="tipo" class="border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
                <option value="interno" {{ request('tipo')=='interno' ? 'selected' : '' }}>Interno</option>
                <option value="prefeitura" {{ request('tipo')=='prefeitura' ? 'selected' : '' }}>Prefeitura</option>
            </select>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Filtrar
        </button>
        <a href="{{ route('funcionarios.index') }}" class="text-gray-400 text-sm py-2">Limpar</a>
    </form>
</div>

<div class="bg-white rounded-xl shadow-sm">
    <div class="p-5 flex justify-between items-center border-b">
        <h3 class="font-semibold text-gray-700">{{ $funcionarios->count() }} funcionário(s)</h3>
        <a href="{{ route('funcionarios.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            + Cadastrar
        </a>
    </div>
    <table class="w-full text-sm">
        <thead class="bg-gray-50">
            <tr class="text-left text-gray-500">
                <th class="px-5 py-3">Nome</th>
                <th class="px-5 py-3">CPF</th>
                <th class="px-5 py-3">Setor</th>
                <th class="px-5 py-3">Tipo</th>
                <th class="px-5 py-3">Equipamento</th>
                <th class="px-5 py-3">Ações</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($funcionarios as $func)
            <tr class="hover:bg-gray-50">
                <td class="px-5 py-4 font-medium">{{ $func->nome }}</td>
                <td class="px-5 py-4 text-gray-500">{{ $func->cpf }}</td>
                <td class="px-5 py-4">
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{{ $func->setor }}</span>
                </td>
                <td class="px-5 py-4 capitalize">{{ $func->tipo }}</td>
                <td class="px-5 py-4">
                    @if($func->emprestimoAtivo && $func->emprestimoAtivo->equipamento)
                        <span class="font-mono text-blue-600 text-xs">{{ $func->emprestimoAtivo->equipamento->patrimonio_id }}</span>
                        <div class="text-xs text-gray-400">{{ $func->emprestimoAtivo->equipamento->modelo }}</div>
                    @else
                        <span class="text-gray-400">—</span>
                    @endif
                </td>
                <td class="px-5 py-4 flex gap-2 items-center">
                    <a href="{{ route('funcionarios.show', $func) }}" class="text-blue-500 text-xs">Ver</a>
                    <a href="{{ route('funcionarios.edit', $func) }}" class="text-yellow-500 text-xs">Editar</a>
                    <form method="POST" action="{{ route('funcionarios.inativar', $func) }}">
                        @csrf @method('PATCH')
                        <button type="submit" class="text-xs {{ $func->ativo ? 'text-red-500' : 'text-green-500' }}">
                            {{ $func->ativo ? 'Inativar' : 'Ativar' }}
                        </button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="px-5 py-12 text-center text-gray-400">Nenhum funcionário cadastrado.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection
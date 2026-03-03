@extends('layouts.app')
@section('titulo', 'Equipamentos')

@section('content')

<div class="bg-white rounded-xl shadow-sm p-5 mb-6">
    <form method="GET" class="flex flex-wrap gap-3 items-end">
        <div>
            <label class="text-xs text-gray-500 block mb-1">Buscar</label>
            <input name="busca" value="{{ request('busca') }}" placeholder="ID, marca, modelo..."
                   class="border rounded-lg px-3 py-2 text-sm w-56 outline-none">
        </div>
        <div>
            <label class="text-xs text-gray-500 block mb-1">Tipo</label>
            <select name="tipo" class="border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
                <option value="tablet" {{ request('tipo')=='tablet' ? 'selected' : '' }}>Tablet</option>
                <option value="notebook" {{ request('tipo')=='notebook' ? 'selected' : '' }}>Notebook</option>
                <option value="desktop" {{ request('tipo')=='desktop' ? 'selected' : '' }}>Desktop</option>
                <option value="monitor" {{ request('tipo')=='monitor' ? 'selected' : '' }}>Monitor</option>
            </select>
        </div>
        <div>
            <label class="text-xs text-gray-500 block mb-1">Status</label>
            <select name="status" class="border rounded-lg px-3 py-2 text-sm outline-none">
                <option value="">Todos</option>
                <option value="disponivel" {{ request('status')=='disponivel' ? 'selected' : '' }}>Disponível</option>
                <option value="em_uso" {{ request('status')=='em_uso' ? 'selected' : '' }}>Em Uso</option>
                <option value="manutencao" {{ request('status')=='manutencao' ? 'selected' : '' }}>Manutenção</option>
                <option value="inativo" {{ request('status')=='inativo' ? 'selected' : '' }}>Inativo</option>
            </select>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Filtrar
        </button>
        <a href="{{ route('equipamentos.index') }}" class="text-gray-400 text-sm py-2">Limpar</a>
    </form>
</div>

<div class="bg-white rounded-xl shadow-sm">
    <div class="p-5 flex justify-between items-center border-b">
        <h3 class="font-semibold text-gray-700">{{ $equipamentos->count() }} equipamento(s)</h3>
        <a href="{{ route('equipamentos.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            + Cadastrar
        </a>
    </div>
    <table class="w-full text-sm">
        <thead class="bg-gray-50">
            <tr class="text-left text-gray-500">
                <th class="px-5 py-3">ID Patrimônio</th>
                <th class="px-5 py-3">Tipo</th>
                <th class="px-5 py-3">Equipamento</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3">Com quem está</th>
                <th class="px-5 py-3">Ações</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($equipamentos as $eq)
            <tr class="hover:bg-gray-50">
                <td class="px-5 py-4 font-mono text-blue-600">{{ $eq->patrimonio_id }}</td>
                <td class="px-5 py-4 capitalize">{{ $eq->tipo }}</td>
                <td class="px-5 py-4">{{ $eq->marca }} {{ $eq->modelo }}</td>
                <td class="px-5 py-4">{{ ucfirst(str_replace('_', ' ', $eq->status)) }}</td>
                <td class="px-5 py-4">
                    @if($eq->emprestimoAtivo && $eq->emprestimoAtivo->funcionario)
                        {{ $eq->emprestimoAtivo->funcionario->nome }}
                        <div class="text-xs text-gray-400">{{ $eq->emprestimoAtivo->funcionario->setor }}</div>
                    @else
                        <span class="text-gray-400">—</span>
                    @endif
                </td>
                <td class="px-5 py-4 flex gap-2">
                    <a href="{{ route('equipamentos.show', $eq) }}" class="text-blue-500 text-xs">Ver</a>
                    <a href="{{ route('equipamentos.edit', $eq) }}" class="text-yellow-500 text-xs">Editar</a>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="6" class="px-5 py-12 text-center text-gray-400">Nenhum equipamento cadastrado.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection

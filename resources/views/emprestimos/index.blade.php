@extends('layouts.app')
@section('titulo', 'Empréstimos')

@section('content')

<div class="bg-white rounded-xl shadow-sm p-5 mb-6">
    <form method="GET" class="flex flex-wrap gap-3 items-end">
        <div>
            <label class="text-xs text-gray-500 block mb-1">Funcionário</label>
            <input name="funcionario" value="{{ request('funcionario') }}" placeholder="Nome do funcionário..."
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
                <option value="ativo" {{ request('status')=='ativo' ? 'selected' : '' }}>Ativo</option>
                <option value="devolvido" {{ request('status')=='devolvido' ? 'selected' : '' }}>Devolvido</option>
            </select>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Filtrar
        </button>
        <a href="{{ route('emprestimos.index') }}" class="text-gray-400 text-sm py-2">Limpar</a>
    </form>
</div>

<div class="bg-white rounded-xl shadow-sm">
    <div class="p-5 flex justify-between items-center border-b">
        <h3 class="font-semibold text-gray-700">{{ $emprestimos->count() }} empréstimo(s)</h3>
        <a href="{{ route('emprestimos.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            + Novo Empréstimo
        </a>
    </div>
    <table class="w-full text-sm">
        <thead class="bg-gray-50">
            <tr class="text-left text-gray-500">
                <th class="px-5 py-3">Equipamento</th>
                <th class="px-5 py-3">Funcionário</th>
                <th class="px-5 py-3">Setor</th>
                <th class="px-5 py-3">Saída</th>
                <th class="px-5 py-3">Devolução</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3">Ação</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($emprestimos as $emp)
            <tr class="hover:bg-gray-50">
                <td class="px-5 py-4">
                    <span class="font-mono text-blue-600 font-medium">{{ $emp->equipamento->patrimonio_id }}</span>
                    <div class="text-xs text-gray-400">{{ $emp->equipamento->marca }} {{ $emp->equipamento->modelo }}</div>
                </td>
                <td class="px-5 py-4 font-medium">{{ $emp->funcionario->nome }}</td>
                <td class="px-5 py-4">
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{{ $emp->funcionario->setor }}</span>
                </td>
                <td class="px-5 py-4 text-gray-500">{{ $emp->data_saida->format('d/m/Y H:i') }}</td>
                <td class="px-5 py-4 text-gray-500">{{ $emp->data_devolucao?->format('d/m/Y H:i') ?? '—' }}</td>
                <td class="px-5 py-4">
                    @if($emp->status == 'ativo')
                        <span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">Em uso</span>
                    @else
                        <span class="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Devolvido</span>
                    @endif
                </td>
                <td class="px-5 py-4">
                    @if($emp->status == 'ativo')
                    <form method="POST" action="{{ route('emprestimos.devolver', $emp) }}">
                        @csrf
                        @method('PATCH')
                        <button class="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded text-xs font-medium transition">
                            Devolver
                        </button>
                    </form>
                    @else
                        <span class="text-gray-300 text-xs">—</span>
                    @endif
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7" class="px-5 py-12 text-center text-gray-400">Nenhum empréstimo registrado.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection
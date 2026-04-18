@extends('layouts.app')
@section('titulo', 'Dashboard')

@section('content')


<div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    @php
    $cards = [
        ['label' => 'Total',        'value' => $stats['total'],        'color' => 'blue',   'icon' => 'fa-boxes'],
        ['label' => 'Disponíveis',  'value' => $stats['disponiveis'],  'color' => 'green',  'icon' => 'fa-check-circle'],
        ['label' => 'Em Uso',       'value' => $stats['em_uso'],       'color' => 'yellow', 'icon' => 'fa-user-check'],
        ['label' => 'Manutenção',   'value' => $stats['manutencao'],   'color' => 'red',    'icon' => 'fa-tools'],
        ['label' => 'Funcionários', 'value' => $stats['funcionarios'], 'color' => 'purple', 'icon' => 'fa-users'],
    ];
    @endphp

    @foreach($cards as $card)
    <div class="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-{{ $card['color'] }}-100 flex items-center justify-center">
            <i class="fa {{ $card['icon'] }} text-{{ $card['color'] }}-600 text-lg"></i>
        </div>
        <div>
            <p class="text-2xl font-bold text-gray-800">{{ $card['value'] }}</p>
            <p class="text-xs text-gray-500">{{ $card['label'] }}</p>
        </div>
    </div>
    @endforeach
</div>


<div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-gray-700"> Equipamentos em Uso</h3>
        <a href="{{ route('emprestimos.create') }}"
           class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
            + Novo Empréstimo
        </a>
    </div>

    <table class="w-full text-sm">
        <thead>
            <tr class="border-b text-left text-gray-500">
                <th class="pb-3 font-medium">Equipamento</th>
                <th class="pb-3 font-medium">Funcionário</th>
                <th class="pb-3 font-medium">Setor</th>
                <th class="pb-3 font-medium">Desde</th>
                <th class="pb-3 font-medium">Ação</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
            @forelse($emprestimos_recentes as $emp)
            <tr class="hover:bg-gray-50">
                <td class="py-3">
                    <span class="font-medium">{{ $emp->equipamento->patrimonio_id }}</span>
                    <span class="text-gray-400 ml-1">{{ $emp->equipamento->modelo }}</span>
                </td>
                <td class="py-3">{{ $emp->funcionario->nome }}</td>
                <td class="py-3">
                    <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                        {{ $emp->funcionario->setor }}
                    </span>
                </td>
                <td class="py-3 text-gray-500">{{ $emp->data_saida->format('d/m/Y') }}</td>
                <td class="py-3">
                    <form method="POST" action="{{ route('emprestimos.devolver', $emp) }}">
                        @csrf @method('PATCH')
                        <button class="text-red-500 hover:text-red-700 text-xs font-medium">
                            Devolver
                        </button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="5" class="py-8 text-center text-gray-400">
                    Nenhum equipamento em uso no momento.
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@endsection

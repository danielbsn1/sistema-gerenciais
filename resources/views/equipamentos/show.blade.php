@extends('layouts.app')
@section('titulo', 'Ficha do Equipamento')

@section('content')

<div class="max-w-4xl mx-auto space-y-6">

    
    <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
        <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ $equipamento->marca }} {{ $equipamento->modelo }}</h2>
            <p class="text-blue-500 font-mono mt-1">{{ $equipamento->patrimonio_id }}</p>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('equipamentos.edit', $equipamento) }}"
               class="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition">
                Editar
            </a>
            <a href="{{ route('equipamentos.index') }}"
               class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition">
                Voltar
            </a>
        </div>
    </div>

    
    <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-700 mb-4">📋 Ficha Técnica</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
            @php
            $campos = [
                'Tipo'              => ucfirst($equipamento->tipo),
                'Número de Série'   => $equipamento->numero_serie ?? '—',
                'Processador'       => $equipamento->processador ?? '—',
                'Memória RAM'       => $equipamento->memoria_ram ?? '—',
                'Armazenamento'     => $equipamento->armazenamento ?? '—',
                'Sistema Operacional' => $equipamento->sistema_operacional ?? '—',
                'Tamanho da Tela'   => $equipamento->tamanho_tela ?? '—',
                'Data de Aquisição' => $equipamento->data_aquisicao?->format('d/m/Y') ?? '—',
                'Valor'             => $equipamento->valor_aquisicao ? 'R$ ' . number_format($equipamento->valor_aquisicao, 2, ',', '.') : '—',
                'Nota Fiscal'       => $equipamento->nota_fiscal ?? '—',
            ];
            @endphp
            @foreach($campos as $label => $valor)
            <div class="flex gap-2">
                <span class="text-gray-400 w-40 shrink-0">{{ $label }}:</span>
                <span class="text-gray-700 font-medium">{{ $valor }}</span>
            </div>
            @endforeach
        </div>
    </div>

    
    <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-700 mb-4">🔄 Histórico de Empréstimos</h3>
        <table class="w-full text-sm">
            <thead class="bg-gray-50">
                <tr class="text-left text-gray-500">
                    <th class="px-4 py-2 font-medium">Funcionário</th>
                    <th class="px-4 py-2 font-medium">Saída</th>
                    <th class="px-4 py-2 font-medium">Devolução</th>
                    <th class="px-4 py-2 font-medium">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                @forelse($historico as $emp)
                <tr>
                    <td class="px-4 py-3">{{ $emp->funcionario->nome }}</td>
                    <td class="px-4 py-3">{{ $emp->data_saida->format('d/m/Y H:i') }}</td>
                    <td class="px-4 py-3">{{ $emp->data_devolucao?->format('d/m/Y H:i') ?? '—' }}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs {{ $emp->status == 'ativo' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700' }}">
                            {{ $emp->status == 'ativo' ? 'Em uso' : 'Devolvido' }}
                        </span>
                    </td>
                </tr>
                @empty
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-400">Nenhum empréstimo registrado.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

</div>
@endsection

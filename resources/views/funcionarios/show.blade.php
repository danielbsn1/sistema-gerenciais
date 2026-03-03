@extends('layouts.app')
@section('titulo', 'Perfil do Funcionário')

@section('content')

<div class="max-w-4xl mx-auto space-y-6">

    <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-start">
        <div>
            <h2 class="text-2xl font-bold text-gray-800">{{ $funcionario->nome }}</h2>
            <p class="text-gray-400 mt-1">{{ $funcionario->cargo }} — {{ $funcionario->setor }}</p>
        </div>
        <div class="flex gap-2">
            <a href="{{ route('funcionarios.edit', $funcionario) }}"
               class="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600">Editar</a>
            <a href="{{ route('funcionarios.index') }}"
               class="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-200">Voltar</a>
        </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-700 mb-4">👤 Dados Pessoais</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
            @php
            $campos = [
                'CPF'      => $funcionario->cpf,
                'Email'    => $funcionario->email ?? '—',
                'Telefone' => $funcionario->telefone ?? '—',
                'Endereço' => $funcionario->endereco ?? '—',
                'Cidade'   => $funcionario->cidade ?? '—',
                'UF'       => $funcionario->uf ?? '—',
                'Tipo'     => ucfirst($funcionario->tipo),
            ];
            @endphp
            @foreach($campos as $label => $valor)
            <div class="flex gap-2">
                <span class="text-gray-400 w-24 shrink-0">{{ $label }}:</span>
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
                    <th class="px-4 py-2">Equipamento</th>
                    <th class="px-4 py-2">Saída</th>
                    <th class="px-4 py-2">Devolução</th>
                    <th class="px-4 py-2">Status</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                @forelse($historico as $emp)
                <tr>
                    <td class="px-4 py-3 font-mono text-blue-600">{{ $emp->equipamento->patrimonio_id }}</td>
                    <td class="px-4 py-3">{{ $emp->data_saida->format('d/m/Y H:i') }}</td>
                    <td class="px-4 py-3">{{ $emp->data_devolucao?->format('d/m/Y H:i') ?? '—' }}</td>
                    <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs {{ $emp->status == 'ativo' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700' }}">
                            {{ $emp->status == 'ativo' ? 'Em uso' : 'Devolvido' }}
                        </span>
                    </td>
                </tr>
                @empty
                <tr><td colspan="4" class="px-4 py-8 text-center text-gray-400">Nenhum empréstimo.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>

@endsection
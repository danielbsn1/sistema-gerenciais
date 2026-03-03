@extends('layouts.app')
@section('titulo', 'Novo Empréstimo')

@section('content')

<div class="max-w-xl mx-auto bg-white rounded-xl shadow-sm p-8">
    <h3 class="font-semibold text-gray-700 mb-6">Registrar Empréstimo</h3>

    <form method="POST" action="{{ route('emprestimos.store') }}" class="space-y-5">
        @csrf

        <div>
            <label class="text-xs text-gray-500 block mb-1">Equipamento disponível *</label>
            <select name="equipamento_id" class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione um equipamento...</option>
                @foreach($equipamentos as $eq)
                <option value="{{ $eq->id }}">{{ $eq->patrimonio_id }} — {{ $eq->marca }} {{ $eq->modelo }} ({{ ucfirst($eq->tipo) }})</option>
                @endforeach
            </select>
        </div>

        <div>
            <label class="text-xs text-gray-500 block mb-1">Funcionário *</label>
            <select name="funcionario_id" class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Selecione um funcionário...</option>
                @foreach($funcionarios as $func)
                <option value="{{ $func->id }}">{{ $func->nome }} — {{ $func->setor }}</option>
                @endforeach
            </select>
        </div>

        <div>
            <label class="text-xs text-gray-500 block mb-1">Observações</label>
            <textarea name="observacoes" rows="3" placeholder="Alguma observação..."
                      class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">{{ old('observacoes') }}</textarea>
        </div>

        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                Registrar Empréstimo
            </button>
            <a href="{{ route('emprestimos.index') }}" class="text-gray-400 text-sm py-2">Cancelar</a>
        </div>
    </form>
</div>

@endsection
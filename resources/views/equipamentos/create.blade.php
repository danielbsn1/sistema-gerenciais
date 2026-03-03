@extends('layouts.app')
@section('titulo', 'Cadastrar Equipamento')

@section('content')

<div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
    <h3 class="font-semibold text-gray-700 mb-6">Novo Equipamento</h3>

    <form method="POST" action="{{ route('equipamentos.store') }}" class="space-y-5">
        @csrf

        <div class="grid grid-cols-2 gap-5">
            <div>
                <label class="text-xs text-gray-500 block mb-1">ID Patrimônio *</label>
                <input name="patrimonio_id" value="{{ old('patrimonio_id') }}" placeholder="Ex: TAB-001"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Tipo *</label>
                <select name="tipo" class="w-full border rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="">Selecione...</option>
                    <option value="tablet">Tablet</option>
                    <option value="notebook">Notebook</option>
                    <option value="desktop">Desktop</option>
                    <option value="monitor">Monitor</option>
                </select>
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Marca *</label>
                <input name="marca" value="{{ old('marca') }}" placeholder="Ex: Samsung"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Modelo *</label>
                <input name="modelo" value="{{ old('modelo') }}" placeholder="Ex: Galaxy Tab A8"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Número de Série</label>
                <input name="numero_serie" value="{{ old('numero_serie') }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Processador</label>
                <input name="processador" value="{{ old('processador') }}" placeholder="Ex: Snapdragon 680"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Memória RAM</label>
                <input name="memoria_ram" value="{{ old('memoria_ram') }}" placeholder="Ex: 4GB"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Armazenamento</label>
                <input name="armazenamento" value="{{ old('armazenamento') }}" placeholder="Ex: 64GB"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Sistema Operacional</label>
                <input name="sistema_operacional" value="{{ old('sistema_operacional') }}" placeholder="Ex: Android 13"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Tamanho da Tela</label>
                <input name="tamanho_tela" value="{{ old('tamanho_tela') }}" placeholder="Ex: 10.5 polegadas"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Data de Aquisição</label>
                <input type="date" name="data_aquisicao" value="{{ old('data_aquisicao') }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Valor de Aquisição (R$)</label>
                <input type="number" step="0.01" name="valor_aquisicao" value="{{ old('valor_aquisicao') }}" placeholder="Ex: 1500.00"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Nota Fiscal</label>
                <input name="nota_fiscal" value="{{ old('nota_fiscal') }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Status</label>
                <select name="status" class="w-full border rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="disponivel">Disponível</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="inativo">Inativo</option>
                </select>
            </div>
        </div>

        <div>
            <label class="text-xs text-gray-500 block mb-1">Observações</label>
            <textarea name="observacoes" rows="3" placeholder="Informações adicionais..."
                      class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">{{ old('observacoes') }}</textarea>
        </div>

        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                Salvar
            </button>
            <a href="{{ route('equipamentos.index') }}" class="text-gray-400 text-sm py-2">Cancelar</a>
        </div>
    </form>
</div>

@endsection
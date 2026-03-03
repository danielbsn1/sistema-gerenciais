@extends('layouts.app')
@section('titulo', 'Editar Equipamento')

@section('content')

<div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
    <h3 class="font-semibold text-gray-700 mb-6">Editar — {{ $equipamento->patrimonio_id }}</h3>

    <form method="POST" action="{{ route('equipamentos.update', $equipamento) }}" class="space-y-5">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-2 gap-5">
            <div>
                <label class="text-xs text-gray-500 block mb-1">ID Patrimônio *</label>
                <input name="patrimonio_id" value="{{ old('patrimonio_id', $equipamento->patrimonio_id) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Tipo *</label>
                <select name="tipo" class="w-full border rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="tablet"   {{ $equipamento->tipo=='tablet'   ? 'selected' : '' }}>Tablet</option>
                    <option value="notebook" {{ $equipamento->tipo=='notebook' ? 'selected' : '' }}>Notebook</option>
                    <option value="desktop"  {{ $equipamento->tipo=='desktop'  ? 'selected' : '' }}>Desktop</option>
                    <option value="monitor"  {{ $equipamento->tipo=='monitor'  ? 'selected' : '' }}>Monitor</option>
                </select>
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Marca *</label>
                <input name="marca" value="{{ old('marca', $equipamento->marca) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Modelo *</label>
                <input name="modelo" value="{{ old('modelo', $equipamento->modelo) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Número de Série</label>
                <input name="numero_serie" value="{{ old('numero_serie', $equipamento->numero_serie) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Status</label>
                <select name="status" class="w-full border rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="disponivel" {{ $equipamento->status=='disponivel' ? 'selected' : '' }}>Disponível</option>
                    <option value="em_uso"     {{ $equipamento->status=='em_uso'     ? 'selected' : '' }}>Em Uso</option>
                    <option value="manutencao" {{ $equipamento->status=='manutencao' ? 'selected' : '' }}>Manutenção</option>
                    <option value="inativo"    {{ $equipamento->status=='inativo'    ? 'selected' : '' }}>Inativo</option>
                </select>
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Memória RAM</label>
                <input name="memoria_ram" value="{{ old('memoria_ram', $equipamento->memoria_ram) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Armazenamento</label>
                <input name="armazenamento" value="{{ old('armazenamento', $equipamento->armazenamento) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>

        <div>
            <label class="text-xs text-gray-500 block mb-1">Observações</label>
            <textarea name="observacoes" rows="3"
                      class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">{{ old('observacoes', $equipamento->observacoes) }}</textarea>
        </div>

        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                Salvar
            </button>
            <a href="{{ route('equipamentos.show', $equipamento) }}" class="text-gray-400 text-sm py-2 hover:text-gray-600">
                Cancelar
            </a>
        </div>
    </form>
</div>

@endsection

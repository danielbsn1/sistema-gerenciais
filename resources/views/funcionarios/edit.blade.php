@extends('layouts.app')
@section('titulo', 'Editar Funcionário')

@section('content')

<div class="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8">
    <h3 class="font-semibold text-gray-700 mb-6">Editar — {{ $funcionario->nome }}</h3>

    <form method="POST" action="{{ route('funcionarios.update', $funcionario) }}" class="space-y-5">
        @csrf
        @method('PUT')

        <div class="grid grid-cols-2 gap-5">
            <div class="col-span-2">
                <label class="text-xs text-gray-500 block mb-1">Nome completo *</label>
                <input name="nome" value="{{ old('nome', $funcionario->nome) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">CPF *</label>
                <input name="cpf" value="{{ old('cpf', $funcionario->cpf) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Telefone</label>
                <input name="telefone" value="{{ old('telefone', $funcionario->telefone) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Email</label>
                <input name="email" type="email" value="{{ old('email', $funcionario->email) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Setor *</label>
                <input name="setor" value="{{ old('setor', $funcionario->setor) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Cargo</label>
                <input name="cargo" value="{{ old('cargo', $funcionario->cargo) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Tipo</label>
                <select name="tipo" class="w-full border rounded-lg px-3 py-2 text-sm outline-none">
                    <option value="interno" {{ $funcionario->tipo=='interno' ? 'selected' : '' }}>Interno</option>
                    <option value="prefeitura" {{ $funcionario->tipo=='prefeitura' ? 'selected' : '' }}>Prefeitura</option>
                </select>
            </div>
            <div class="col-span-2">
                <label class="text-xs text-gray-500 block mb-1">Endereço</label>
                <input name="endereco" value="{{ old('endereco', $funcionario->endereco) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">Cidade</label>
                <input name="cidade" value="{{ old('cidade', $funcionario->cidade) }}"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <div>
                <label class="text-xs text-gray-500 block mb-1">UF</label>
                <input name="uf" value="{{ old('uf', $funcionario->uf) }}" maxlength="2"
                       class="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
            </div>
        </div>

        <div class="flex gap-3 pt-2">
            <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700">
                Salvar
            </button>
            <a href="{{ route('funcionarios.show', $funcionario) }}" class="text-gray-400 text-sm py-2">Cancelar</a>
        </div>
    </form>
</div>

@endsection
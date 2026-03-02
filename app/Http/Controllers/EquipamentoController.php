<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Equipamento;

class EquipamentoController extends Controller
{
    // Lista todos os equipamentos
    public function index()
    {
        $equipamentos = Equipamento::all();
        return view('equipamentos.index', compact('equipamentos'));
    }

    // Mostra o formulário para criar
    public function create()
    {
        return view('equipamentos.create');
    }

    // Salva um novo equipamento
    public function store(Request $request)
    {
        $data = $request->validate([
            'patrimonio_id' => 'required|unique:equipamentos',
            'tipo' => 'required|string',
            'marca' => 'required|string',
            'modelo' => 'nullable|string',
            'numero_serie' => 'nullable|string',
            'processador' => 'nullable|string',
            'memoria_ram' => 'nullable|string',
            'armazenamento' => 'nullable|string',
            'sistema_operacional' => 'nullable|string',
            'resolucao' => 'nullable|string',
            'tamanho_tela' => 'nullable|string',
            'data_aquisicao' => 'nullable|date',
            'valor_aquisicao' => 'nullable|numeric',
            'nota_fiscal' => 'nullable|string',
            'status' => 'required|string',
            'observacoes' => 'nullable|string',
        ]);

        Equipamento::create($data);

        return redirect()->route('equipamentos.index')->with('success', 'Equipamento criado com sucesso!');
    }

    // Mostra um equipamento específico
    public function show(Equipamento $equipamento)
    {
        return view('equipamentos.show', compact('equipamento'));
    }

    // Mostra o formulário de edição
    public function edit(Equipamento $equipamento)
    {
        return view('equipamentos.edit', compact('equipamento'));
    }

    // Atualiza o equipamento
    public function update(Request $request, Equipamento $equipamento)
    {
        $data = $request->validate([
            'patrimonio_id' => 'required|unique:equipamentos,patrimonio_id,' . $equipamento->id,
            'tipo' => 'required|string',
            'marca' => 'required|string',
            'modelo' => 'nullable|string',
            'numero_serie' => 'nullable|string',
            'processador' => 'nullable|string',
            'memoria_ram' => 'nullable|string',
            'armazenamento' => 'nullable|string',
            'sistema_operacional' => 'nullable|string',
            'resolucao' => 'nullable|string',
            'tamanho_tela' => 'nullable|string',
            'data_aquisicao' => 'nullable|date',
            'valor_aquisicao' => 'nullable|numeric',
            'nota_fiscal' => 'nullable|string',
            'status' => 'required|string',
            'observacoes' => 'nullable|string',
        ]);

        $equipamento->update($data);

        return redirect()->route('equipamentos.index')->with('success', 'Equipamento atualizado com sucesso!');
    }

    // Deleta o equipamento
    public function destroy(Equipamento $equipamento)
    {
        $equipamento->delete();
        return redirect()->route('equipamentos.index')->with('success', 'Equipamento removido com sucesso!');
    }
}

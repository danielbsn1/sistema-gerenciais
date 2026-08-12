<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use App\Support\RelatorioHtml;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatorioController extends Controller
{
    public function index()
    {
        return Inertia::render('Relatorios/Index');
    }

    public function equipamentos(Request $request)
    {
        [$colunas, $linhas] = $this->dadosEquipamentos($request);

        return Inertia::render('Relatorios/Imprimir', [
            'titulo' => 'Relatório de Equipamentos',
            'colunas' => $colunas,
            'linhas' => $linhas,
            'emitidoEm' => now()->format('d/m/Y H:i'),
        ]);
    }

    public function equipamentosPdf(Request $request)
    {
        [$colunas, $linhas] = $this->dadosEquipamentos($request);

        return Pdf::loadHTML(RelatorioHtml::tabela('Relatório de Equipamentos', $colunas, $linhas))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_equipamentos.pdf');
    }

    public function funcionarios(Request $request)
    {
        [$colunas, $linhas] = $this->dadosFuncionarios();

        return Inertia::render('Relatorios/Imprimir', [
            'titulo' => 'Relatório de Funcionários',
            'colunas' => $colunas,
            'linhas' => $linhas,
            'emitidoEm' => now()->format('d/m/Y H:i'),
        ]);
    }

    public function funcionariosPdf(Request $request)
    {
        [$colunas, $linhas] = $this->dadosFuncionarios();

        return Pdf::loadHTML(RelatorioHtml::tabela('Relatório de Funcionários', $colunas, $linhas))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_funcionarios.pdf');
    }

    public function emprestimos(Request $request)
    {
        [$colunas, $linhas] = $this->dadosEmprestimos();

        return Inertia::render('Relatorios/Imprimir', [
            'titulo' => 'Relatório de Empréstimos',
            'colunas' => $colunas,
            'linhas' => $linhas,
            'emitidoEm' => now()->format('d/m/Y H:i'),
        ]);
    }

    public function emprestimosPdf(Request $request)
    {
        [$colunas, $linhas] = $this->dadosEmprestimos();

        return Pdf::loadHTML(RelatorioHtml::tabela('Relatório de Empréstimos', $colunas, $linhas))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_emprestimos.pdf');
    }

    /**
     * @return array{0: array<int, string>, 1: array<int, array<int, string|int|null>>}
     */
    private function dadosEquipamentos(Request $request): array
    {
        $colunas = ['Patrimônio', 'Tipo', 'Marca', 'Modelo', 'Nº Série', 'Status'];

        $linhas = $this->filtroEquipamentos($request)->get()->map(fn (Equipamento $e) => [
            $e->patrimonio_id,
            $e->tipo,
            $e->marca,
            $e->modelo,
            $e->numero_serie ?? '—',
            $e->status,
        ])->all();

        return [$colunas, $linhas];
    }

    /**
     * @return array{0: array<int, string>, 1: array<int, array<int, string|int|null>>}
     */
    private function dadosFuncionarios(): array
    {
        $colunas = ['Nome', 'CPF', 'Cargo', 'Setor', 'Telefone', 'Situação'];

        $linhas = Funcionario::orderBy('nome')->get()->map(fn (Funcionario $f) => [
            $f->nome,
            $f->cpf,
            $f->cargo,
            $f->setor,
            $f->telefone ?? '—',
            $f->ativo ? 'Ativo' : 'Inativo',
        ])->all();

        return [$colunas, $linhas];
    }

    /**
     * @return array{0: array<int, string>, 1: array<int, array<int, string|int|null>>}
     */
    private function dadosEmprestimos(): array
    {
        $colunas = ['Equipamento', 'Funcionário', 'Setor', 'Data de Saída', 'Data de Devolução', 'Status'];

        $linhas = Emprestimo::with('funcionario', 'equipamento')->latest()->get()->map(
            fn (Emprestimo $em) => [
                trim("{$em->equipamento->patrimonio_id} — {$em->equipamento->marca} {$em->equipamento->modelo}"),
                $em->funcionario->nome,
                $em->funcionario->setor,
                $em->data_saida?->format('d/m/Y H:i') ?? '—',
                $em->data_devolucao?->format('d/m/Y H:i') ?? '—',
                $em->status,
            ]
        )->all();

        return [$colunas, $linhas];
    }

    private function filtroEquipamentos(Request $request)
    {
        return Equipamento::query()
            ->when($request->tipo, fn ($q, $tipo) => $q->where('tipo', $tipo))
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->when($request->search, fn ($q, $s) => $q->where('marca', 'like', "%{$s}%")
                ->orWhere('modelo', 'like', "%{$s}%")
                ->orWhere('patrimonio_id', 'like', "%{$s}%"))
            ->orderBy('tipo');
    }
}

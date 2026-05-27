<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use App\Models\Funcionario;
use App\Models\Emprestimo;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total'        => Equipamento::count(),
            'disponiveis'  => Equipamento::where('status', 'disponivel')->count(),
            'em_uso'       => Equipamento::where('status', 'em_uso')->count(),
            'manutencao'   => Equipamento::where('status', 'manutencao')->count(),
            'funcionarios' => Funcionario::where('ativo', true)->count(),
            'funcionarios_inativos' => Funcionario::where('inativo', true)->count(),
        ];

        $emprestimos_recentes = Emprestimo::with(['equipamento', 'funcionario'])
                                          ->where('status', 'ativo','inativo')
                                          ->latest()
                                          ->take(10)
                                          ->get();

        return \Inertia\Inertia::render('Dashboard/Index', [
            'stats'               => $stats,
            'emprestimos_recentes' => $emprestimos_recentes,
        ]);
    }
}

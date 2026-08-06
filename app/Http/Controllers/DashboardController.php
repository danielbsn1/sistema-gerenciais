<?php

namespace App\Http\Controllers;

use App\Models\Equipamento;
use App\Models\Funcionario;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Index', [
            'totalEquipamentos' => Equipamento::count(),

            'disponiveis' => Equipamento::where(
                'status',
                'disponivel'
            )->count(),

            'emUso' => Equipamento::where(
                'status',
                'em_uso'
            )->count(),

            'manutencao' => Equipamento::where(
                'status',
                'manutencao'
            )->count(),

            'funcionarios' => Funcionario::count(),
        ]);
    }
}

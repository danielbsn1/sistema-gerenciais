<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('equipamentos', EquipamentoController::class);
    Route::resource('funcionarios', FuncionarioController::class);
    Route::patch('funcionarios/{funcionario}/inativar', [FuncionarioController::class, 'inativar'])->name('funcionarios.inativar');
    Route::resource('emprestimos', EmprestimoController::class)->only(['index', 'create', 'store']);
    Route::patch('emprestimos/{emprestimo}/devolver', [EmprestimoController::class, 'devolver'])
         ->name('emprestimos.devolver');
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
});

require __DIR__.'/auth.php';

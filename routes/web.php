<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\DashboardController;

Route::middleware(['auth'])->group(function () {

    Route::get('/', function () {
        return redirect()->route('dashboard');
    });

    

    Route::get('/dashboard', [DashboardController::class, 'index'])
    ->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | Equipamentos
    |--------------------------------------------------------------------------
    */

    Route::get('/equipamentos', [EquipamentoController::class, 'index'])
        ->name('equipamentos.index');

    Route::get('/equipamentos/create', [EquipamentoController::class, 'create'])
        ->name('equipamentos.create');

    Route::post('/equipamentos', [EquipamentoController::class, 'store'])
        ->name('equipamentos.store');

    Route::get('/equipamentos/{equipamento}', [EquipamentoController::class, 'show'])
        ->name('equipamentos.show');

    Route::get('/equipamentos/{equipamento}/edit', [EquipamentoController::class, 'edit'])
        ->name('equipamentos.edit');

    Route::put('/equipamentos/{equipamento}', [EquipamentoController::class, 'update'])
        ->name('equipamentos.update');

    Route::delete('/equipamentos/{equipamento}', [EquipamentoController::class, 'destroy'])
        ->name('equipamentos.destroy');

   
    /*
    |--------------------------------------------------------------------------
    | Funcionários
    |--------------------------------------------------------------------------
    */

    Route::get('/funcionarios', [FuncionarioController::class, 'index'])
        ->name('funcionarios.index');

    Route::get('/funcionarios/create', [FuncionarioController::class, 'create'])
        ->name('funcionarios.create');

    Route::post('/funcionarios', [FuncionarioController::class, 'store'])
        ->name('funcionarios.store');

    Route::get('/funcionarios/{funcionario}', [FuncionarioController::class, 'show'])
        ->name('funcionarios.show');

    Route::get('/funcionarios/{funcionario}/edit', [FuncionarioController::class, 'edit'])
        ->name('funcionarios.edit');

    Route::put('/funcionarios/{funcionario}', [FuncionarioController::class, 'update'])
        ->name('funcionarios.update');

    Route::patch('/funcionarios/{funcionario}/inativar', [FuncionarioController::class, 'inativar'])
        ->name('funcionarios.inativar');

    Route::delete('/funcionarios/{funcionario}', [FuncionarioController::class, 'destroy'])
        ->name('funcionarios.destroy');

    /*
    |--------------------------------------------------------------------------
    | Empréstimos
    |--------------------------------------------------------------------------
    */

    Route::get('/emprestimos', [EmprestimoController::class, 'index'])
        ->name('emprestimos.index');

    Route::get('/emprestimos/create', [EmprestimoController::class, 'create'])
        ->name('emprestimos.create');

    Route::post('/emprestimos', [EmprestimoController::class, 'store'])
        ->name('emprestimos.store');

    Route::get('/emprestimos/{emprestimo}', [EmprestimoController::class, 'show'])
        ->name('emprestimos.show');

    Route::get('/emprestimos/{emprestimo}/edit', [EmprestimoController::class, 'edit'])
        ->name('emprestimos.edit');

    Route::put('/emprestimos/{emprestimo}', [EmprestimoController::class, 'update'])
        ->name('emprestimos.update');

    Route::delete('/emprestimos/{emprestimo}', [EmprestimoController::class, 'destroy'])
        ->name('emprestimos.destroy');

    Route::patch('/emprestimos/{emprestimo}/devolver', [EmprestimoController::class, 'devolver'])
        ->name('emprestimos.devolver'); 

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});

require __DIR__ . '/auth.php';
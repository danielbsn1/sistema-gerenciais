<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipamentoController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    
  
    Route::get('/dashboard', function () {
         return Inertia::render('Dashboard/Index');
           })->middleware(['auth'])->name('dashboard');




    Route::get('equipamentos',function(){
        return Inertia::render('Equipamentos/Index');
    })->name('equipamentos.index');
    Route::get('equipamentos/create',function(){
        return Inertia::render('Equipamentos/Create');
    })->name('equipamentos.create');
    
    Route::get('funcionarios', function () {
        return Inertia::render('Funcionarios/Index');
    })->name('funcionarios.index');
    Route::get('funcionarios/,create', function () {
        return Inertia::render('Funcionarios/Create');
    })->name('funcionarios.create');

    Route::get('emprestimos', function () {
    return Inertia::render('Emprestimos/Index', [
        'emprestimos' => [],
        'filters' => [
            'search' => '',
            'status' => '',
        ],
    ]);
})->name('emprestimos.index');



    Route::get('emprestimos/create',function(){
        return Inertia::render('Emprestimos/Create');
    })->name('emprestimos.create');
   Route::get('emprestimos/{emprestimo}', function ($emprestimo) {
        return Inertia::render('Emprestimos/Show', ['emprestimoId' => $emprestimo]);
    })->name('emprestimos.show');
    Route::patch('emprestimos/{emprestimo}/devolver', function ($emprestimo) {
        return Inertia::render('Emprestimos/Devolver', ['emprestimoId' => $emprestimo]);
    })->name('emprestimos.devolver');
        
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
});

require __DIR__.'/auth.php';

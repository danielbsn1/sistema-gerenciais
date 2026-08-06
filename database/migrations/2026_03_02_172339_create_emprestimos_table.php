<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emprestimos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipamento_id')->constrained()->onDelete('restrict');
            $table->foreignId('funcionario_id')->constrained()->onDelete('restrict');
            $table->foreignId('admin_id')->constrained('users')->onDelete('restrict');
            $table->dateTime('data_saida');
            $table->dateTime('data_devolucao')->nullable();
            $table->enum('status', ['ativo', 'devolvido'])->default('ativo');
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('emprestimos');
    }
};

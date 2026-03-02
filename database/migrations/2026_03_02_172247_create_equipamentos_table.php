<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipamentos', function (Blueprint $table) {
            $table->id();
            $table->string('patrimonio_id')->unique();
            $table->enum('tipo', ['tablet', 'notebook', 'desktop', 'monitor']);
            $table->string('marca');
            $table->string('modelo');
            $table->string('numero_serie')->unique()->nullable();
            $table->string('processador')->nullable();
            $table->string('memoria_ram')->nullable();
            $table->string('armazenamento')->nullable();
            $table->string('sistema_operacional')->nullable();
            $table->string('resolucao')->nullable();
            $table->string('tamanho_tela')->nullable();
            $table->date('data_aquisicao')->nullable();
            $table->decimal('valor_aquisicao', 10, 2)->nullable();
            $table->string('nota_fiscal')->nullable();
            $table->enum('status', ['disponivel', 'em_uso', 'manutencao', 'inativo'])->default('disponivel');
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipamentos');
    }
};

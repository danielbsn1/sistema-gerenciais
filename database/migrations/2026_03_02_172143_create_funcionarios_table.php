<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cpf', 14)->unique();
            $table->string('email')->nullable();
            $table->string('telefone', 20)->nullable();
            $table->string('setor');              // Campo, TI, Administrativo...
            $table->string('cargo')->nullable();
            $table->string('endereco')->nullable();
            $table->string('cidade')->nullable();
            $table->string('uf', 2)->nullable();
            $table->enum('tipo', ['interno', 'prefeitura'])->default('interno');
            $table->boolean('ativo')->default(true);
            $table->timestamps();
        });

    }


    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};

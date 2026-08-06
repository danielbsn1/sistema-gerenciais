<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'cpf', 'email', 'telefone',
        'setor', 'cargo', 'endereco', 'cidade', 'uf', 'tipo', 'ativo', 'inativo',
    ];

    public function emprestimos()
    {
        return $this->hasMany(Emprestimo::class);
    }

    public function emprestimoAtivo()
    {
        return $this->hasOne(Emprestimo::class)->where('status', 'ativo')->latest();
    }
}

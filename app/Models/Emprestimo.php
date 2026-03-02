<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Emprestimo extends Model {
    use HasFactory;

    protected $fillable = [
        'equipamento_id', 'funcionario_id', 'admin_id',
        'data_saida', 'data_devolucao', 'status', 'observacoes'
    ];

    protected $casts = [
        'data_saida'     => 'datetime',
        'data_devolucao' => 'datetime',
    ];

    public function equipamento() { return $this->belongsTo(Equipamento::class); }
    public function funcionario() { return $this->belongsTo(Funcionario::class); }
    public function admin()       { return $this->belongsTo(User::class, 'admin_id'); }
}

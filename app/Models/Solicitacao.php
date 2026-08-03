<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solicitacao extends Model
{
    protected $table = 'solicitacoes';

    protected $fillable = [
        'user_id',
        'tipo_equipamento',
        'motivo',
        'urgencia',
        'observacoes',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

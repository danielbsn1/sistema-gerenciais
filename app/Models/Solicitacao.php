<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Solicitacao extends Model
{
    use HasFactory;
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

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Emprestimo;
use App\Models\User;
class Equipamento extends Model {
    protected $fillable = [
        'patrimonio_id', 'tipo', 'marca', 'modelo', 'numero_serie',
        'processador', 'memoria_ram', 'armazenamento', 'sistema_operacional',
        'resolucao', 'tamanho_tela', 'data_aquisicao',
        'valor_aquisicao', 'nota_fiscal', 'status', 'observacoes'
    ];

    protected $casts = ['data_aquisicao' => 'date'];

    public function emprestimos() {
        return $this->hasMany(Emprestimo::class);
    }

    public function emprestimoAtivo() {
        return $this->hasOne(Emprestimo::class)
                    ->where('status', 'ativo')
                    ->with('funcionario')
                    ->latest();
    }

    public function isDisponivel(): bool {
        return $this->status === 'disponivel';
    }
}
?>

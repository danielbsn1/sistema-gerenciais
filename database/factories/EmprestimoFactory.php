<?php

namespace Database\Factories;

use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Emprestimo>
 */
class EmprestimoFactory extends Factory
{
    protected $model = Emprestimo::class;

    public function definition(): array
    {
        return [
            'equipamento_id' => Equipamento::factory(),
            'funcionario_id' => Funcionario::factory(),
            'admin_id'       => User::factory(),
            'data_saida'     => now(),
            'status'         => 'ativo',
            'observacoes'    => fake()->sentence(),
        ];
    }

    public function devolvido(): static
    {
        return $this->state(fn () => [
            'status'         => 'devolvido',
            'data_devolucao' => now(),
        ]);
    }
}

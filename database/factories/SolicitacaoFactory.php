<?php

namespace Database\Factories;

use App\Models\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Solicitacao>
 */
class SolicitacaoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'user_id' => User::factory(),
        'tipo_equipamento' => fake()->randomElement(['Notebook', 'Desktop', 'Monitor', 'Tablet']),
        'motivo' => fake()->sentence(6),
        'urgencia' => fake()->randomElement(['baixa', 'media', 'alta']),
        'status' => fake()->randomElement(['pendente', 'aprovada', 'recusada']),
        ];
    }
}

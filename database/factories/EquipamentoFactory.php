<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipamento>
 */
class EquipamentoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'patrimonio_id' => fake()->unique()->numerify('PAT-####'),
        'tipo' => fake()->randomElement(['tablet', 'notebook', 'desktop', 'monitor']),
        'marca' => fake()->randomElement(['Dell', 'Lenovo', 'HP', 'Acer']),
        'modelo' => fake()->bothify('??-####'),
        'status' => 'disponivel',
        'observacoes' => fake()->optional()->sentence(),
        ];
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Funcionario>
 */
class FuncionarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
        'nome' => fake()->name(),
        'cpf' => fake()->unique()->numerify('###########'),
        'email' => fake()->unique()->safeEmail(),
        'telefone' => fake()->numerify('(##) #####-####'),
        'setor' => fake()->randomElement(['TI', 'Administrativo', 'Compras', 'Campo']),
        'cargo' => fake()->jobTitle(),
        'endereco' => fake()->streetAddress(),
        'cidade' => fake()->city(),
        'uf' => fake()->stateAbbr(),
        'tipo' => fake()->randomElement(['interno', 'prefeitura']),
        'ativo' => true,

        ];
    }
}

<?php

namespace App\Imports;

use App\Models\Funcionario;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;

class FuncionarioImport implements SkipsOnFailure, ToModel, WithCustomCsvSettings, WithHeadingRow, WithValidation
{
    public int $importados = 0;

    /** @var Failure[] */
    public array $falhas = [];

    public function getCsvSettings(): array
    {
        return [
            'input_encoding' => 'UTF-8',
            'delimiter' => ',',
        ];
    }

    public function rules(): array
    {
        return [
            'nome' => ['required'],
            'cpf' => ['required', Rule::unique('funcionarios', 'cpf')],
            'cargo' => ['required'],
            'setor' => ['required'],
            'telefone' => ['required'],
        ];
    }

    public function model(array $row)
    {
        $this->importados++;

        return new Funcionario([
            'nome' => $row['nome'],
            'cpf' => $row['cpf'],
            'cargo' => $row['cargo'],
            'setor' => $row['setor'],
            'telefone' => $row['telefone'],
        ]);
    }

    public function onFailure(Failure ...$failures): void
    {
        foreach ($failures as $failure) {
            $this->falhas[] = $failure;
        }
    }
}

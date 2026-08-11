<?php

namespace App\Imports;

use App\Models\Equipamento;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithCustomCsvSettings;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;

class EquipamentoImport implements SkipsOnFailure, ToModel, WithCustomCsvSettings, WithHeadingRow, WithValidation
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
            'patrimonio_id' => ['required', Rule::unique('equipamentos', 'patrimonio_id')],
            'marca' => ['required'],
            'modelo' => ['required'],
            'tipo' => ['required', 'in:tablet,notebook,desktop,monitor'],
        ];
    }

    public function model(array $row)
    {
        $this->importados++;

        return new Equipamento([
            'patrimonio_id' => $row['patrimonio_id'],
            'tipo' => $row['tipo'],
            'marca' => $row['marca'],
            'modelo' => $row['modelo'],
        ]);
    }

    public function onFailure(Failure ...$failures): void
    {
        foreach ($failures as $failure) {
            $this->falhas[] = $failure;
        }
    }
}

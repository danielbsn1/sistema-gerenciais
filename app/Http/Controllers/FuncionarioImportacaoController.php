<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFuncionarioImportRequest;
use App\Imports\FuncionarioImport;
use App\Notifications\ImportacaoConcluidaNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class FuncionarioImportacaoController extends Controller
{
    public function import(StoreFuncionarioImportRequest $request)
    {
        $import = new FuncionarioImport;
        Excel::import($import, $request->file('planilha'));

        $caminhoErros = $this->gerarCsvErros($import->falhas, 'funcionarios');

        Notification::send(
            $request->user(),
            new ImportacaoConcluidaNotification(
                'funcionarios',
                $import->importados,
                count($import->falhas),
                $caminhoErros,
            )
        );

        return redirect()->route('funcionarios.index')->with(
            'success',
            "Importação concluída: {$import->importados} cadastrados, ".count($import->falhas).' com erro.'
        );
    }

    public function template()
    {
        $headers = ['nome', 'cpf', 'cargo', 'setor', 'telefone'];

        return response()->streamDownload(function () use ($headers) {
            $file = fopen('php://output', 'w');
            fwrite($file, "\xEF\xBB\xBF");
            fputcsv($file, $headers);
            fputcsv($file, ['João da Silva', '123.456.789-00', 'Analista', 'TI', '(11) 99999-0000']);
            fclose($file);
        }, 'template_importacao_funcionarios.csv');
    }

    private function gerarCsvErros(array $falhas, string $tipo): ?string
    {
        if (empty($falhas)) {
            return null;
        }

        $arquivo = "imports/erros_{$tipo}_".now()->format('Ymd_His').'.csv';

        $handle = fopen('php://temp', 'w');
        fwrite($handle, "\xEF\xBB\xBF");
        fputcsv($handle, ['linha', 'campo', 'erro']);

        foreach ($falhas as $failure) {
            foreach ($failure->errors() as $erro) {
                fputcsv($handle, [$failure->row(), $failure->attribute(), $erro]);
            }
        }

        rewind($handle);
        Storage::put($arquivo, stream_get_contents($handle));
        fclose($handle);

        return $arquivo;
    }
}

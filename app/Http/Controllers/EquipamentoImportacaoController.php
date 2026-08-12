<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipamentoImportRequest;
use App\Imports\EquipamentoImport;
use App\Notifications\ImportacaoConcluidaNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;

class EquipamentoImportacaoController extends Controller
{
    public function import(StoreEquipamentoImportRequest $request)
    {
        $import = new EquipamentoImport;
        Excel::import($import, $request->file('planilha'));

        $caminhoErros = $this->gerarCsvErros($import->falhas, 'equipamentos');

        Notification::send(
            $request->user(),
            new ImportacaoConcluidaNotification(
                'equipamentos',
                $import->importados,
                count($import->falhas),
                $caminhoErros,
            )
        );

        return redirect()->route('equipamentos.index')->with(
            'success',
            "Importação concluída: {$import->importados} cadastrados, ".count($import->falhas).' com erro.'
        );
    }

    public function template()
    {
        $headers = ['patrimonio_id', 'tipo', 'marca', 'modelo'];

        return response()->streamDownload(function () use ($headers) {
            $file = fopen('php://output', 'w');
            fwrite($file, "\xEF\xBB\xBF");
            fputcsv($file, $headers);
            fputcsv($file, ['EX-0001', 'notebook', 'Dell', 'Latitude 5520']);
            fclose($file);
        }, 'template_importacao_equipamentos.csv');
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

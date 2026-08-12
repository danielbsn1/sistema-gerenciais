<?php

namespace App\Support;

class RelatorioHtml
{
    /**
     * Gera o documento HTML de um relatório tabular (usado pelo DomPDF).
     *
     * @param  array<int, string>  $colunas
     * @param  array<int, array<int, string|int|null>>  $linhas
     */
    public static function tabela(string $titulo, array $colunas, array $linhas): string
    {
        $thead = '';
        foreach ($colunas as $coluna) {
            $thead .= '<th>'.e($coluna).'</th>';
        }

        if (empty($linhas)) {
            $tbody = '<tr><td colspan="'.count($colunas).'">Nenhum registro encontrado.</td></tr>';
        } else {
            $tbody = '';
            foreach ($linhas as $linha) {
                $tbody .= '<tr>';
                foreach ($linha as $valor) {
                    $tbody .= '<td>'.e((string) $valor).'</td>';
                }
                $tbody .= '</tr>';
            }
        }

        $html = <<<'HTML'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>%TITULO%</title>
    <style>
        * { font-family: Arial, sans-serif; box-sizing: border-box; }
        body { padding: 24px; color: #111; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #999; padding: 6px 8px; font-size: 12px; text-align: left; }
        th { background: #f3f4f6; }
        h1 { font-size: 18px; margin: 0; }
        .meta { font-size: 12px; color: #555; margin-top: 4px; }
    </style>
</head>
<body>
    <h1>%TITULO%</h1>
    <p class="meta">Emitido em: %DATA%</p>
    <table>
        <thead><tr>%THEAD%</tr></thead>
        <tbody>%TBODY%</tbody>
    </table>
</body>
</html>
HTML;

        return str_replace(
            ['%TITULO%', '%DATA%', '%THEAD%', '%TBODY%'],
            [e($titulo), now()->format('d/m/Y H:i'), $thead, $tbody],
            $html
        );
    }
}

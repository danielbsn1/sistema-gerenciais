# Novas Funcionalidades — Passo a Passo (Backend)

Guia para implementar, **apenas no backend**, as seguintes funcionalidades:

1. Cadastro de usuários pelo admin (email, senha e perfil: Colaborador ou Admin)
2. Relatórios com opção de imprimir (PDF / página de impressão)
3. Importação de equipamentos via planilha (campos obrigatórios: `patrimonio_id`, `marca`, `modelo`, `tipo`) com notificação de conclusão e relatório de erros
4. Importação de funcionários via planilha (campos obrigatórios: `nome`, `cpf`, `cargo`, `setor`, `telefone`)

O projeto usa: **Laravel 12**, **Inertia.js + React** (frontend) e padrões internos de `Controllers`, `Http/Requests`, `Actions` e `Notifications`.

> Observação: neste guia cobrimos só o backend. Ao final existe uma seção com os próximos passos de frontend (páginas React/Inertia), que serão feitos depois.

---

## Passo 0 — Instalar dependências

São necessários dois pacotes e a tabela de notificações:

```bash
composer require maatwebsite/excel
composer require barryvdh/laravel-dompdf
```

Criar a tabela de notificações (para a notificação "importação concluída" ficar visível no sistema):

```bash
php artisan notifications:table
php artisan migrate
```

Ambos os pacotes têm service providers com auto-discovery (não precisa registrar nada em `bootstrap/providers.php`).

- `maatwebsite/excel` — lê `.xlsx`, `.xls` e `.csv` (usa PhpSpreadsheet por baixo)
- `barryvdh/laravel-dompdf` — gera PDF dos relatórios

---

## Funcionalidade 1 — Cadastro de usuários pelo admin

A ideia: o admin acessa uma área **/usuarios** para cadastrar novos usuários (email, senha e perfil `admin` ou `user`/"colaborador"). A rota pública de registro (`/register`) deve ser desativada para que usuários não se cadastrem sozinhos.

> O campo `role` já existe na tabela `users` (enum `admin`, `user`) — não precisa de migration. O valor `user` é o perfil "Colaborador".

### 1.1 Model `User`

Já está pronto. O `role` já está em `$fillable` e a senha já é criptografada automaticamente pelo cast `hashed`:

```php
// app/Models/User.php (já existente)
protected $fillable = ['name', 'email', 'password', 'role'];

protected function casts(): array
{
    return [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
```

Por isso, ao cadastrar, basta passar a senha em texto puro no `$request->validated()`.

### 1.2 Form Requests

Criar dois requests de validação.

**`app/Http/Requests/StoreUserRequest.php`**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role'     => ['required', 'in:admin,user'],
        ];
    }
}
```

**`app/Http/Requests/UpdateUserRequest.php`**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'max:255', 'unique:users,email,' . $this->route('user')->id],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role'     => ['required', 'in:admin,user'],
        ];
    }

    public function validated($key = null, $default = null)
    {
        $data = parent::validated();

        if (empty($data['password'])) {
            unset($data['password']);
        }

        return $data;
    }
}
```

### 1.3 Controller

**`app/Http/Controllers/UserController.php`**

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $usuarios = User::when($request->search, fn ($q) => $q
            ->where('name', 'like', "%{$request->search}%")
            ->orWhere('email', 'like', "%{$request->search}%"))
            ->orderBy('name')
            ->get();

        return Inertia::render('Usuarios/Index', ['usuarios' => $usuarios]);
    }

    public function create()
    {
        return Inertia::render('Usuarios/Create');
    }

    public function store(StoreUserRequest $request)
    {
        User::create($request->validated());

        return redirect()->route('usuarios.index')->with('success', 'Usuário cadastrado!');
    }

    public function edit(User $user)
    {
        return Inertia::render('Usuarios/Edit', ['usuario' => $user]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());

        return redirect()->route('usuarios.index')->with('success', 'Usuário atualizado!');
    }

    public function destroy(User $user)
    {
        abort_if($user->id === auth()->id(), 403, 'Você não pode remover o próprio usuário.');

        $user->delete();

        return redirect()->route('usuarios.index')->with('success', 'Usuário removido!');
    }
}
```

### 1.4 Rotas

Adicionar dentro do grupo `['auth', 'admin']` em `routes/web.php`:

```php
Route::resource('usuarios', UserController::class)->except('show');
```

E adicionar o import no topo do arquivo:

```php
use App\Http\Controllers\UserController;
```

> `Route::resource` gera automaticamente: `GET/POST /usuarios`, `GET/PUT /usuarios/{user}/edit`, `DELETE /usuarios/{user}`.

### 1.5 Desativar o registro público

Em `routes/auth.php`, comentar (ou remover) as duas rotas de registro dentro do grupo `guest`:

```php
Route::middleware('guest')->group(function () {
    // Route::get('register', [RegisteredUserController::class, 'create'])
    //     ->name('register');

    // Route::post('register', [RegisteredUserController::class, 'store']);
    ...
});
```

---

## Funcionalidade 2 — Relatórios com opção de imprimir

Backend gera duas coisas por relatório:

- uma **página de impressão** (Blade) que o navegador pode imprimir (Ctrl+P / "Imprimir"), e
- um **PDF** baixável via DomPDF.

Relatórios sugeridos: Equipamentos, Funcionários e Empréstimos.

### 2.1 Controller

**`app/Http/Controllers/RelatorioController.php`**

```php
<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Equipamento;
use App\Models\Funcionario;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class RelatorioController extends Controller
{
    public function index()
    {
        return inertia('Relatorios/Index');
    }

    // ---------- Equipamentos ----------

    public function equipamentos(Request $request)
    {
        return view('relatorios.equipamentos', [
            'equipamentos' => $this->filtroEquipamentos($request)->get(),
            'filtros'      => $request->all(),
        ]);
    }

    public function equipamentosPdf(Request $request)
    {
        $equipamentos = $this->filtroEquipamentos($request)->get();

        return Pdf::loadView('relatorios.equipamentos_pdf', compact('equipamentos'))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_equipamentos.pdf');
    }

    // ---------- Funcionários ----------

    public function funcionarios(Request $request)
    {
        return view('relatorios.funcionarios', [
            'funcionarios' => Funcionario::orderBy('nome')->get(),
        ]);
    }

    public function funcionariosPdf(Request $request)
    {
        $funcionarios = Funcionario::orderBy('nome')->get();

        return Pdf::loadView('relatorios.funcionarios_pdf', compact('funcionarios'))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_funcionarios.pdf');
    }

    // ---------- Empréstimos ----------

    public function emprestimos(Request $request)
    {
        return view('relatorios.emprestimos', [
            'emprestimos' => Emprestimo::with('funcionario', 'equipamento')->latest()->get(),
        ]);
    }

    public function emprestimosPdf(Request $request)
    {
        $emprestimos = Emprestimo::with('funcionario', 'equipamento')->latest()->get();

        return Pdf::loadView('relatorios.emprestimos_pdf', compact('emprestimos'))
            ->setPaper('a4', 'landscape')
            ->download('relatorio_emprestimos.pdf');
    }

    private function filtroEquipamentos(Request $request)
    {
        return Equipamento::query()
            ->when($request->tipo, fn ($q, $tipo) => $q->where('tipo', $tipo))
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->when($request->search, fn ($q, $s) => $q->where('marca', 'like', "%{$s}%")
                ->orWhere('modelo', 'like', "%{$s}%")
                ->orWhere('patrimonio_id', 'like', "%{$s}%"))
            ->orderBy('tipo');
    }
}
```

> O método `index()` retorna uma página Inertia com os botões que apontam para as rotas abaixo (isso é frontend, feito depois).

### 2.2 Views Blade de impressão e PDF

Criar as views de relatório. Exemplo para equipamentos:

**`resources/views/relatorios/equipamentos.blade.php`** (página de impressão)

```blade
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Relatório de Equipamentos</title>
    <style>
        * { font-family: Arial, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #999; padding: 6px 8px; font-size: 12px; text-align: left; }
        th { background: #f3f4f6; }
        h1 { font-size: 18px; }
        @media print {
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <button class="no-print" onclick="window.print()">Imprimir</button>
    <h1>Relatório de Equipamentos</h1>
    <p>Emitido em: {{ now()->format('d/m/Y H:i') }}</p>

    <table>
        <thead>
            <tr>
                <th>Patrimônio</th>
                <th>Tipo</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($equipamentos as $equipamento)
                <tr>
                    <td>{{ $equipamento->patrimonio_id }}</td>
                    <td>{{ $equipamento->tipo }}</td>
                    <td>{{ $equipamento->marca }}</td>
                    <td>{{ $equipamento->modelo }}</td>
                    <td>{{ $equipamento->status }}</td>
                </tr>
            @empty
                <tr><td colspan="5">Nenhum equipamento encontrado.</td></tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
```

**`resources/views/relatorios/equipamentos_pdf.blade.php`** (mesma tabela, sem o botão imprimir, para o DomPDF)

Crie as duplas equivalentes para `funcionarios` e `emprestimos`:

- `funcionarios.blade.php` / `funcionarios_pdf.blade.php` — colunas: Nome, CPF, Cargo, Setor, Telefone
- `emprestimos.blade.php` / `emprestimos_pdf.blade.php` — colunas: Equipamento, Funcionário, Data, Status

### 2.3 Rotas

Adicionar no grupo `['auth', 'admin']` em `routes/web.php`:

```php
use App\Http\Controllers\RelatorioController;

Route::get('/relatorios', [RelatorioController::class, 'index'])->name('relatorios.index');
Route::get('/relatorios/equipamentos', [RelatorioController::class, 'equipamentos'])->name('relatorios.equipamentos');
Route::get('/relatorios/equipamentos/pdf', [RelatorioController::class, 'equipamentosPdf'])->name('relatorios.equipamentos.pdf');
Route::get('/relatorios/funcionarios', [RelatorioController::class, 'funcionarios'])->name('relatorios.funcionarios');
Route::get('/relatorios/funcionarios/pdf', [RelatorioController::class, 'funcionariosPdf'])->name('relatorios.funcionarios.pdf');
Route::get('/relatorios/emprestimos', [RelatorioController::class, 'emprestimos'])->name('relatorios.emprestimos');
Route::get('/relatorios/emprestimos/pdf', [RelatorioController::class, 'emprestimosPdf'])->name('relatorios.emprestimos.pdf');
```

---

## Funcionalidade 3 — Importação de equipamentos via planilha

Fluxo:

1. Admin faz upload de `.xlsx`, `.xls` ou `.csv`
2. Backend lê a planilha, valida as linhas (campos obrigatórios: `patrimonio_id`, `marca`, `modelo`, `tipo`)
3. Linhas válidas são cadastradas automaticamente
4. Linhas com erro são coletadas e geradas em um **arquivo CSV de erros**
5. Uma **notificação** ("importação concluída") é enviada para o admin com os totais

### 3.1 Request de validação do arquivo

**`app/Http/Requests/StoreEquipamentoImportRequest.php`**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipamentoImportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'planilha' => ['required', 'file', 'mimes:xlsx,xls,csv'],
        ];
    }
}
```

### 3.2 Classe de importação

**`app/Imports/EquipamentoImport.php`**

```php
<?php

namespace App\Imports;

use App\Models\Equipamento;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;

class EquipamentoImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    public int $importados = 0;

    /** @var Failure[] */
    public array $falhas = [];

    public function rules(): array
    {
        return [
            'patrimonio_id' => ['required'],
            'marca'         => ['required'],
            'modelo'        => ['required'],
            'tipo'          => ['required', 'in:tablet,notebook,desktop,monitor'],
        ];
    }

    public function model(array $row)
    {
        $this->importados++;

        return new Equipamento([
            'patrimonio_id' => $row['patrimonio_id'],
            'tipo'          => $row['tipo'],
            'marca'         => $row['marca'],
            'modelo'        => $row['modelo'],
        ]);
    }

    public function onFailure(Failure ...$failures): void
    {
        foreach ($failures as $failure) {
            $this->falhas[] = $failure;
        }
    }
}
```

> `WithHeadingRow`: a primeira linha da planilha é o cabeçalho. O `model()` só é chamado para linhas que passam na validação — por isso `importados` só conta os válidos.

### 3.3 Notificação de importação concluída

**`app/Notifications/ImportacaoConcluidaNotification.php`**

```php
<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ImportacaoConcluidaNotification extends Notification
{
    public function __construct(
        public string $tipo,
        public int $importados,
        public int $erros,
        public ?string $caminhoErros = null,
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'tipo'            => $this->tipo,
            'importados'      => $this->importados,
            'erros'           => $this->erros,
            'caminho_erros'   => $this->caminhoErros,
            'mensagem'        => "Importação de {$this->tipo} concluída: {$this->importados} cadastrados, {$this->erros} com erro.",
        ];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Importação de {$this->tipo} concluída")
            ->line("{$this->importados} registros cadastrados com sucesso.")
            ->line("{$this->erros} registros com erro.");
    }
}
```

### 3.4 Métodos `import()` e `template()` no controller

Adicionar em **`app/Http/Controllers/EquipamentoController.php`**:

```php
use App\Http\Requests\StoreEquipamentoImportRequest;
use App\Imports\EquipamentoImport;
use App\Notifications\ImportacaoConcluidaNotification;
use Illuminate\Support\Facades\Notification;
use Maatwebsite\Excel\Facades\Excel;

public function import(StoreEquipamentoImportRequest $request)
{
    $import = new EquipamentoImport();
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
        "Importação concluída: {$import->importados} cadastrados, " . count($import->falhas) . " com erro."
    );
}

public function template()
{
    $headers = ['patrimonio_id', 'tipo', 'marca', 'modelo'];

    return response()->streamDownload(function () use ($headers) {
        $file = fopen('php://output', 'w');
        fputs($file, "\xEF\xBB\xBF"); // BOM para abrir no Excel sem caracteres quebrados
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

    $arquivo = "imports/erros_{$tipo}_" . now()->format('Ymd_His') . '.csv';
    $path    = storage_path("app/{$arquivo}");

    $handle = fopen($path, 'w');
    fputs($handle, "\xEF\xBB\xBF");
    fputcsv($handle, ['linha', 'campo', 'erro']);

    foreach ($falhas as $failure) {
        foreach ($failure->errors() as $erro) {
            fputcsv($handle, [$failure->row(), $failure->attribute(), $erro]);
        }
    }

    fclose($handle);

    return $arquivo;
}
```

> Observação sobre duplicidade: se o mesmo `patrimonio_id` aparecer duas vezes **dentro do próprio arquivo**, a segunda linha pode gerar exceção de unicidade do banco. Para evitar, é possível remover a checagem de banco da importação e tratar no `model()` retornando `null` para patrimônios que já existem (ex.: `Equipamento::where('patrimonio_id', $row['patrimonio_id'])->exists()`).

### 3.5 Rotas

Adicionar no grupo `['auth', 'admin']` em `routes/web.php`:

```php
Route::post('/equipamentos/importar', [EquipamentoController::class, 'import'])
    ->name('equipamentos.import');

Route::get('/equipamentos/importar/template', [EquipamentoController::class, 'template'])
    ->name('equipamentos.import.template');
```

### 3.6 Modelo da planilha

| patrimônio_id | tipo                | marca | modelo        |
| ------------- | ------------------- | ----- | ------------- |
| EX-0001       | notebook            | Dell  | Latitude 5520 |
| EX-0002       | tablet              | Samsung | Galaxy Tab S9 |

- `tipo` aceita apenas: `tablet`, `notebook`, `desktop`, `monitor`
- Status será cadastrado como `disponivel` (padrão da tabela)

---

## Funcionalidade 4 — Importação de funcionários via planilha

Mesmo fluxo da importação de equipamentos, com os campos obrigatórios: `nome`, `cpf`, `cargo`, `setor`, `telefone`.

### 4.1 Request de validação do arquivo

**`app/Http/Requests/StoreFuncionarioImportRequest.php`**

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFuncionarioImportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'planilha' => ['required', 'file', 'mimes:xlsx,xls,csv'],
        ];
    }
}
```

### 4.2 Classe de importação

**`app/Imports/FuncionarioImport.php`**

```php
<?php

namespace App\Imports;

use App\Models\Funcionario;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;

class FuncionarioImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    public int $importados = 0;

    /** @var Failure[] */
    public array $falhas = [];

    public function rules(): array
    {
        return [
            'nome'     => ['required'],
            'cpf'      => ['required'],
            'cargo'    => ['required'],
            'setor'    => ['required'],
            'telefone' => ['required'],
        ];
    }

    public function model(array $row)
    {
        $this->importados++;

        return new Funcionario([
            'nome'     => $row['nome'],
            'cpf'      => $row['cpf'],
            'cargo'    => $row['cargo'],
            'setor'    => $row['setor'],
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
```

### 4.3 Métodos `import()` e `template()` no controller

Adicionar em **`app/Http/Controllers/FuncionarioController.php`**:

```php
use App\Http\Requests\StoreFuncionarioImportRequest;
use App\Imports\FuncionarioImport;
use App\Notifications\ImportacaoConcluidaNotification;
use Illuminate\Support\Facades\Notification;
use Maatwebsite\Excel\Facades\Excel;

public function import(StoreFuncionarioImportRequest $request)
{
    $import = new FuncionarioImport();
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
        "Importação concluída: {$import->importados} cadastrados, " . count($import->falhas) . " com erro."
    );
}

public function template()
{
    $headers = ['nome', 'cpf', 'cargo', 'setor', 'telefone'];

    return response()->streamDownload(function () use ($headers) {
        $file = fopen('php://output', 'w');
        fputs($file, "\xEF\xBB\xBF"); // BOM para abrir no Excel sem caracteres quebrados
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

    $arquivo = "imports/erros_{$tipo}_" . now()->format('Ymd_His') . '.csv';
    $path    = storage_path("app/{$arquivo}");

    $handle = fopen($path, 'w');
    fputs($handle, "\xEF\xBB\xBF");
    fputcsv($handle, ['linha', 'campo', 'erro']);

    foreach ($falhas as $failure) {
        foreach ($failure->errors() as $erro) {
            fputcsv($handle, [$failure->row(), $failure->attribute(), $erro]);
        }
    }

    fclose($handle);

    return $arquivo;
}
```

> Dica: o trecho `gerarCsvErros()` é duplicado nos dois controllers. Se quiser seguir o padrão do projeto, mova para uma `Action` (ex.: `App\Actions\GerarCsvErrosImportacaoAction`) e chame via `app(...)`.

### 4.4 Rotas

Adicionar no grupo `['auth', 'admin']` em `routes/web.php`:

```php
Route::post('/funcionarios/importar', [FuncionarioController::class, 'import'])
    ->name('funcionarios.import');

Route::get('/funcionarios/importar/template', [FuncionarioController::class, 'template'])
    ->name('funcionarios.import.template');
```

### 4.5 Modelo da planilha

| nome          | cpf           | cargo    | setor | telefone        |
| ------------- | ------------- | -------- | ----- | --------------- |
| João da Silva | 123.456.789-00 | Analista | TI    | (11) 99999-0000 |

---

## Resumo das rotas novas

| Método | Rota                                    | Ação                          |
| ------ | --------------------------------------- | ----------------------------- |
| GET    | `/usuarios`                             | Lista usuários                |
| GET    | `/usuarios/create`                      | Form de cadastro              |
| POST   | `/usuarios`                             | Cadastra usuário              |
| GET    | `/usuarios/{user}/edit`                 | Form de edição                |
| PUT    | `/usuarios/{user}`                      | Atualiza usuário              |
| DELETE | `/usuarios/{user}`                      | Remove usuário                |
| GET    | `/relatorios`                           | Página de relatórios (Inertia)|
| GET    | `/relatorios/equipamentos`              | Imprime equipamentos          |
| GET    | `/relatorios/equipamentos/pdf`          | Baixa PDF de equipamentos     |
| GET    | `/relatorios/funcionarios`              | Imprime funcionários          |
| GET    | `/relatorios/funcionarios/pdf`          | Baixa PDF de funcionários     |
| GET    | `/relatorios/emprestimos`               | Imprime empréstimos           |
| GET    | `/relatorios/emprestimos/pdf`           | Baixa PDF de empréstimos      |
| POST   | `/equipamentos/importar`                | Importa planilha de equipamentos |
| GET    | `/equipamentos/importar/template`       | Baixa modelo de planilha      |
| POST   | `/funcionarios/importar`                | Importa planilha de funcionários |
| GET    | `/funcionarios/importar/template`       | Baixa modelo de planilha      |

Todas ficam dentro do grupo `['auth', 'admin']`.

---

## Verificação rápida (backend)

```bash
# Formata o código no padrão do projeto
./vendor/bin/pint app/

# Roda as migrations (caso a tabela de notificações não exista)
php artisan migrate

# Rota nova: importar equipamento
curl -X POST -F "planilha=@caminho/modelo.xlsx" \
  -b cookies.txt http://localhost:8000/equipamentos/importar

# Rota nova: baixar relatório PDF
curl -o relatorio.pdf http://localhost:8000/relatorios/equipamentos/pdf
```

---

## Próximos passos (frontend — serão feitos depois)

- Páginas React/Inertia em `resources/js/Pages/Usuarios/`: `Index`, `Create`, `Edit`
- Página `Relatorios/Index` com botões de "Imprimir" e "Baixar PDF" apontando para as rotas
- Modal/área de upload de planilha em `Equipamentos/Index` e `Funcionarios/Index` com os botões de "Baixar modelo" e "Importar"
- Badge de notificações no layout para consumir a tabela `notifications` (ex.: endpoint que retorna as notificações do usuário logado)
- Link de download do CSV de erros armazenado no caminho retornado pela notificação (via `Storage::download($caminhoErros)`)

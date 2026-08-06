# Fluxo do Sistema — Sistema Gerenciais

Documento de apoio para retomar o desenvolvimento. Explica como o sistema funciona, os fluxos de cada módulo e pontos de atenção conhecidos.

---

## 1. Visão geral

Sistema web de **gerenciamento de TI**: cadastro de equipamentos e funcionários, controle de empréstimos e um fluxo de **solicitações de equipamentos** com dois papéis de usuário:

- **admin** — acesso completo (dashboard, equipamentos, funcionários, empréstimos e avaliação de solicitações).
- **user** (colaborador) — acesso apenas às próprias solicitações de equipamento.

O frontend é uma SPA **React (Inertia.js)** servida pelo Laravel. As páginas ficam em `resources/ts/pages/` e são compiladas pelo Vite para `public/build/`.

---

## 2. Stack

| Camada      | Tecnologia                                   |
| ----------- | -------------------------------------------- |
| Backend     | Laravel 12 (PHP 8.4)                         |
| Frontend    | React 19 + Inertia.js + Tailwind (Vite 7)    |
| Banco       | MySQL 8.0 (`sistema-gerenciais`)             |
| Infra       | Docker Compose (app + nginx + mysql + phpMyAdmin) |

---

## 3. Como rodar

```bash
docker compose up -d              # sobe app, nginx, db e phpMyAdmin
docker compose exec app php artisan key:generate   # só na primeira vez
docker compose exec app php artisan migrate        # só na primeira vez (ou após novas migrations)
docker compose exec app npm run build              # recompilar frontend (páginas novas)
```

Acessos:

| Serviço      | URL                |
| ------------ | ------------------ |
| Aplicação    | http://localhost:8000 |
| phpMyAdmin   | http://localhost:8080 (root / root) |
| Banco (host) | `localhost:3307` |

> **Importante:** o `docker-compose.yml` monta `.:/var/www` como volume, ou seja, o `vendor/`, `node_modules/` e `storage/` são os da máquina host. Depois de um `git pull` ou troca de branch, rode de novo `composer install` e `npm install` dentro do container.

---

## 4. Estrutura de pastas

```
app/
├── Http/
│   ├── Controllers/            # Dashboard, Equipamento, Funcionario, Emprestimo, Solicitacao
│   │   └── Auth/               # login, registro, senha (Breeze)
│   └── Middleware/AdminMiddleware.php
├── Models/                     # User, Equipamento, Funcionario, Emprestimo, Solicitacao
database/migrations/            # tabelas + coluna role + tabela solicitacoes
resources/ts/
├── pages/                      # páginas React por módulo
│   ├── Auth/                   # Login, Register
│   ├── Dashboard/
│   ├── Equipamentos/
│   ├── Funcionarios/
│   ├── Emprestimos/
│   └── Solicitacoes/           # Index (colaborador) e Admin
├── layout/Sidebar.tsx          # menu varia conforme o papel
├── styles/                     # CSS por módulo
routes/
├── web.php                     # rotas dos módulos + separação admin/user
└── auth.php                    # login, registro, reset de senha
```

---

## 5. Autenticação e papéis

O campo `role` na tabela `users` (`enum`: `admin` | `user`, padrão `user`) define o acesso.

- **Registro** (`GET/POST /register` → `RegisteredUserController@store`): cria usuário com `role = 'user'` e já faz login, redirecionando para `/solicitacoes`.
- **Login** (`AuthenticatedSessionController@store`): redireciona conforme o papel
  - `admin` → `/dashboard`
  - `user` → `/solicitacoes`
- **Rotas**: em `routes/web.php`
  - `Route::middleware(['auth'])` → rotas de qualquer usuário logado (solicitações).
  - `Route::middleware(['auth', 'admin'])` → dashboard, equipamentos, funcionários, empréstimos e painel de solicitações. O alias `admin` está registrado em `bootstrap/app.php` e aponta para `AdminMiddleware`, que redireciona quem não for admin para `/solicitacoes`.
- **Sidebar** (`resources/ts/layout/Sidebar.tsx`): se `role === 'admin'` mostra o menu administrativo; senão mostra só "Minhas Solicitações".

---

## 6. Fluxo dos módulos

### 6.1 Solicitações de equipamento (feature mais recente)

1. O **colaborador** (`user`) acessa `/solicitacoes` (`SolicitacaoController@index`) e vê apenas as próprias solicitações.
2. Cria uma solicitação (`POST /solicitacoes` → `store`): tipo de equipamento, motivo, urgência (baixa/media/alta) e observações. Nasce com `status = 'pendente'`.
3. O **admin** acessa `/solicitacoes/admin` (`adminIndex`) e vê todas, com o nome de quem pediu (relação `with('user')`).
4. O admin aprova ou recusa (`PATCH /solicitacoes/{id}/avaliar` → `avaliar`), alterando o status para `aprovada` ou `recusada`.
5. O colaborador vê a atualização na lista (não há notificação automática).

**Tabela `solicitacoes`:** `user_id` (FK), `tipo_equipamento`, `motivo`, `urgencia` (baixa/media/alta), `observacoes`, `status` (pendente/aprovada/recusada).

### 6.2 Dashboard (só admin)

`DashboardController@index` retorna contagens: total de equipamentos, disponíveis, em uso, em manutenção e quantidade de funcionários. Renderiza `Dashboard/Index`.

### 6.3 Equipamentos (só admin)

CRUD completo em `EquipamentoController`:

- Lista com filtros por `tipo`, `status` e busca (patrimônio/marca/modelo) — `Equipamentos/Index`.
- Cadastro (`create`/`store`): valida `patrimonio_id` único, tipo (`tablet|notebook|desktop|monitor`), marca e modelo.
- Detalhe (`show`): mostra o equipamento e o histórico de empréstimos.
- Edição (`edit`/`update`).
- Exclusão (`destroy`): apaga também os empréstimos vinculados.

**Status possíveis:** `disponivel`, `em_uso`, `manutencao`, `inativo` (padrão `disponivel`).

### 6.4 Funcionários (só admin)

CRUD em `FuncionarioController`:

- Lista com busca (nome/CPF) e filtros por `setor` e `tipo` — `Funcionarios/Index`.
- Cadastro: valida nome, CPF único e setor.
- Detalhe com histórico de empréstimos (`show`).
- **Inativar/ativar** (`PATCH /funcionarios/{id}/inativar` → `inativar`): alterna a coluna booleana `ativo`.
- Edição e exclusão.

**Tabela `funcionarios`:** `nome`, `cpf` (único), email, telefone, setor, cargo, endereço, cidade, uf, `tipo` (`interno|prefeitura`), `ativo` (bool) e `inativo` (bool).

### 6.5 Empréstimos (só admin)

Controle de empréstimo de equipamento para funcionário em `EmprestimoController`:

1. Lista com filtros por `status`, `tipo` do equipamento e nome do funcionário — `Emprestimos/Index`.
2. `create`: lista **somente equipamentos `disponivel`** e todos os funcionários.
3. `store`: cria o empréstimo com `status = 'ativo'`, `data_saida = now()` e muda o equipamento para `em_uso`. Bloqueia equipamento que não está disponível.
4. `devolver` (`PATCH /emprestimos/{id}/devolver`): marca o empréstimo como `devolvido`, preenche `data_devolucao` e volta o equipamento para `disponivel`.
5. `show`: detalhe com equipamento e funcionário.

**Tabela `emprestimos`:** `equipamento_id`, `funcionario_id`, `admin_id` (quem registrou), `data_saida`, `data_devolucao`, `status` (`ativo|devolvido`), `observacoes`.

---

## 7. Relacionamentos

- `Equipamento` → `hasMany Emprestimo`; `Emprestimo` → `belongsTo Equipamento`.
- `Funcionario` → `hasMany Emprestimo`; `Emprestimo` → `belongsTo Funcionario`.
- `User` → `hasMany Emprestimo` (via `admin_id`); `Emprestimo` → `belongsTo User` (`admin`).
- `User` → `hasMany Solicitacao`; `Solicitacao` → `belongsTo User`.

---

## 8. Pontos de atenção (bugs/ajustes pendentes)

Registrados ao revisar o código — úteis para as próximas melhorias:

1. **`admin_id` fixo no empréstimo** — `EmprestimoController.php:55` grava `'admin_id' => 1` em vez do usuário logado. Se outro admin operar, fica errado.
2. **Relação `emprestimoAtivo` com SQL inválido** — em `Equipamento.php` e `Funcionario.php`, o `where('status', 'ativo','inativo')` passa 3 argumentos (comportamento inesperado). Deveria ser `whereIn('status', ['ativo', 'inativo'])` ou apenas `where('status', 'ativo')`.
3. **Migration vazia** — `2026_03_02_202336_add_coluna_status_...` não executa nada (os status já estão nos `create` das tabelas). Pode ser removida.
4. **Coluna duplicada no funcionário** — existem `ativo` e `inativo` (dois booleans). O sistema usa apenas `ativo`.
5. **Equipamentos sem edição de status manual** — não há rota para colocar equipamento em `manutencao`/`inativo`; só muda via empréstimo/devolução.
6. **Sem notificação de solicitação** — o colaborador só descobre aprovação/recusa ao reabrir a página.
7. **`sistema-gerenciais` vs `sistema_gerenciais`** — o banco no docker-compose usa hífen; o `.env` local está alinhado (`sistema-gerenciais`). Cuidado ao trocar de ambiente.
8. **E-mail de notificação nunca chega** — ver análise detalhada na seção 8.1 abaixo.

---

### 8.1 Análise: e-mail de notificação não está chegando

**Sintoma:** nenhum e-mail é recebido (ex.: aviso de aprovação/recusa de solicitação, redefinição de senha).

**Causa raiz — são 2 problemas somados:**

1. **Não existe código de notificação no sistema.**
   - Não há pasta `app/Notifications/`, nenhuma chamada a `Mail::`, `->notify()` ou `Notification::send` em lugar nenhum.
   - Em `SolicitacaoController@avaliar` (aprovado/recusado), o código só faz `$solicitacao->update(['status' => ...])` e volta para a página. **Nenhum e-mail é disparado** para o colaborador.
   - Ou seja, o e-mail "não chega" porque simplesmente não é enviado por falta de código, não por erro de envio.

2. **Mesmo que houvesse envio, o mailer está configurado como `log`** (`.env`):
   ```env
   MAIL_MAILER=log
   MAIL_HOST=127.0.0.1
   MAIL_PORT=2525
   MAIL_USERNAME=null
   MAIL_PASSWORD=null
   MAIL_FROM_ADDRESS="hello@example.com"
   ```
   Com `MAIL_MAILER=log`, o Laravel não envia e-mail real: ele apenas escreve o "e-mail" em `storage/logs/laravel.log`. Para enviar de verdade seria preciso um servidor SMTP (Gmail, Brevo, Mailtrap, etc.) e alterar o `.env`.

**Outros achados relacionados:**
- `RegisteredUserController@store` dispara `event(new Registered($user))`, mas **nenhum e-mail sai** porque o modelo `User` **não implementa** `MustVerifyEmail` (está comentado em `app/Models/User.php`) e não há listener para o evento.
- O envio de redefinição de senha (`PasswordResetLinkController`) também usa o mailer padrão (`log`) → também não chega na caixa de entrada.
- `MAIL_FROM_ADDRESS=hello@example.com` é um placeholder; remetentes assim costumam cair em spam ou serem rejeitados.

**Como corrigir (quando for mexer):**
1. Criar a notificação (ex.: `php artisan make:notification SolicitacaoStatusNotification` com um Mailable para "aprovada"/"recusada").
2. Chamar o envio em `SolicitacaoController@avaliar` para o `$solicitacao->user` (ex.: `$solicitacao->user->notify(...)`).
3. Configurar SMTP real no `.env` (ex.: `MAIL_MAILER=smtp`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM_ADDRESS`) e rodar `docker compose exec app php artisan config:clear`.
4. Para testar em desenvolvimento sem enviar de verdade: usar `MAIL_MAILER=log` e conferir `storage/logs/laravel.log`, ou usar um serviço como **Mailtrap**.

---

## 9. Roadmap de melhorias (para portfólio)

Priorizado por **custo-benefício** — deixar o sistema "completo" sem ficar grandioso. O objetivo é mostrar código limpo, testes e acabamento, não volume de features.

### P1 — Obrigatório (fazer primeiro)

1. **Corrigir os bugs da seção 8** — principalmente o `admin_id => 1` fixo no empréstimo (`EmprestimoController.php:55`) e a relação `emprestimoAtivo` com SQL inválido (`Equipamento.php` / `Funcionario.php`). Código com bug desvaloriza o portfólio.
2. **Notificação por e-mail** — implementar o fluxo da seção 8.1 (aviso de aprovação/recusa de solicitação). É a feature que o dono do projeto já quer.
3. **Seeders + factories com dados de demonstração** — rodar `db:seed` e o sistema já abre populado (equipamentos, funcionários, empréstimos, solicitações). Ótimo para quem for avaliar.
4. **Paginação nas listagens** — equipamentos, funcionários, empréstimos e solicitações usam `->get()`; trocar por `->paginate()` para comportamento com volume real de dados.

### P2 — Diferencial (sem exagero)

5. **Exportar CSV** — de equipamentos e empréstimos (fácil e útil para gestão de TI).
6. **Dashboard com 1 gráfico simples** — ex.: equipamentos por tipo ou empréstimos por mês (recharts ou gráfico em CSS).
7. **Testes automatizados (Pest)** — dos fluxos principais: login e papéis (admin vs user), CRUD de equipamento, fluxo de solicitação (criar/aprovar/recusar). É o que mais separa um portfólio bom de um mediano.
8. **Status manual do equipamento** — botão para colocar em manutenção/inativo (hoje só muda via empréstimo/devolução).

### Fora de escopo (evitar — seria "grandioso" demais)

- Microserviços ou divisão de apps
- Fila dedicada / Redis / workers de produção
- Multitenancy
- Deploy com CI/CD elaborado
- Relatórios extensos em PDF

---

## 10. Comandos úteis para desenvolvimento

```bash
# parar tudo
docker compose down

# logs da aplicação
docker compose logs -f app

# abrir um shell php dentro do app
docker compose exec app php artisan tinker

# listar rotas
docker compose exec app php artisan route:list

# criar usuário rápido (papel admin)
docker compose exec app php artisan tinker --execute="\App\Models\User::create(['name'=>'Admin','email'=>'admin@admin.com','password'=>bcrypt('admin123'),'role'=>'admin']);"

# recriar banco do zero (atenção: apaga dados)
docker compose down -v && docker compose up -d --build
```

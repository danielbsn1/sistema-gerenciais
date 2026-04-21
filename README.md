# sistema-gerenciais

Sistema web para gerenciamento de informações empresariais, desenvolvido com **Laravel** e **Tailwind CSS**, permitindo o controle e visualização de dados gerenciais de forma centralizada.

---

## Funcionalidades

- Autenticação de usuários (login/logout)
- Cadastro e gerenciamento de registros gerenciais
- Painel de controle com visão geral das informações
- Interface responsiva com Tailwind CSS
- Estrutura MVC com Laravel
- Ambiente completo via Docker

---

## Tecnologias

| Camada         | Tecnologia              |
| -------------- | ----------------------- |
| Backend        | Laravel 11 (PHP 8.2)    |
| Frontend       | Blade + Tailwind CSS    |
| Build          | Vite                    |
| Banco de dados | MySQL 8.0               |
| Servidor web   | Nginx                   |
| Infraestrutura | Docker + Docker Compose |

---

## Instalação com Docker

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/danielbsn1/sistema-gerenciais.git
cd sistema-gerenciais
```

**2. Configure o ambiente**

```bash
cp .env.example .env
```
```env
APP_NAME="Sistema Gerenciais"
APP_URL=http://localhost:8001

DB_HOST=db
DB_PORT=3306
DB_DATABASE=sistema_gerenciais
DB_USERNAME=root
DB_PASSWORD=linux
```

**3. Suba os containers**

```bash
docker-compose up -d
```

**4. Gere a chave da aplicação**

```bash
docker exec laravel_app php artisan key:generate
```

**5. Rode as migrations**

```bash
docker exec laravel_app php artisan migrate
```

**6. Crie o primeiro usuário**

```bash
docker exec -it laravel_app php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Seu Nome',
    'email' => 'seu@email.com',
    'password' => bcrypt('sua_senha'),
]);
```

##  Demonstração

###  Dashboard
Visão geral do sistema com métricas principais como total de equipamentos, disponíveis, em uso, em manutenção e quantidade de funcionários.
<img width="1443" height="811" alt="image" src="https://github.com/user-attachments/assets/21277d63-4181-4a84-9a6d-7b8e7303f457" />



---

###  Gestão de Equipamentos
Tela de gerenciamento dos ativos cadastrados, com filtros por tipo e status, permitindo controle completo do inventário.

<img width="1446" height="812" alt="image" src="https://github.com/user-attachments/assets/1099e8de-5953-461b-9a28-154a21832061" />

---

###  Gestão de Funcionários
Visualização e controle dos funcionários, incluindo vínculo com equipamentos e informações organizacionais.
<img width="1450" height="812" alt="image" src="https://github.com/user-attachments/assets/82a51dec-e947-451a-96e0-5374c55e52ef" />


### Gestao de Emprestimos de Equipamentos 
Visualização e controle dos emprestimos, incluindo vínculo com equipamentos e informações organizacionais.
<img width="1455" height="808" alt="image" src="https://github.com/user-attachments/assets/843685cd-3225-4eab-9ebb-1501991701b8" />




---

## Instalação Manual

### Pré-requisitos

- PHP >= 8.2
- Composer
- Node.js + npm
- MySQL

### Passo a passo

**1. Clone o repositório**

```bash
git clone https://github.com/danielbsn1/sistema-gerenciais.git
cd sistema-gerenciais
```

**2. Instale as dependências PHP**

```bash
composer install
```

**3. Instale as dependências JavaScript**

```bash
npm install
```

**4. Configure o ambiente**

```bash
cp .env.example .env
```

**5. Gere a chave da aplicação**

```bash
php artisan key:generate
```

**6. Rode as migrations**

```bash
php artisan migrate
```

**7. Compile os assets**

```bash
npm run dev
```

**8. Inicie o servidor**

```bash
php artisan serve
```

**9. Crie o primeiro usuário**

```bash
php artisan tinker
```

```php
\App\Models\User::create([
    'name' => 'Seu Nome',
    'email' => 'seu@email.com',
    'password' => bcrypt('sua_senha'),
]);
```

---

## Estrutura do Projeto

```
├── app/
│   ├── Http/Controllers/
│   └── Models/
├── database/
│   └── migrations/
├── resources/
│   └── views/
├── routes/
│   └── web.php
├── public/
├── .env.example
└── composer.json
```

---

## Variáveis de Ambiente

| Variável      | Descrição                                | Padrão                  |
| ------------- | ---------------------------------------- | ----------------------- |
| `DB_HOST`     | Host do banco (usar `db` no Docker)      | `127.0.0.1`             |
| `DB_DATABASE` | Nome do banco                            | `sistema_gerenciais`    |
| `DB_USERNAME` | Usuário do banco                         | `root`                  |
| `DB_PASSWORD` | Senha do banco                           | *(vazio)*               |
| `APP_URL`     | URL da aplicação                         | `http://localhost`      |

---

## Segurança

- Todas as rotas são protegidas por autenticação
- Senhas armazenadas com `bcrypt`
- Tokens CSRF em todos os formulários
- Validação de dados em todos os endpoints

---

## Aprendizados

- Desenvolvimento de aplicações web com Laravel
- Estilização com Tailwind CSS e build com Vite
- Arquitetura MVC e boas práticas de organização de código
- Autenticação e proteção de rotas
- Containerização com Docker

---

## Autor

Desenvolvido por **Daniel**

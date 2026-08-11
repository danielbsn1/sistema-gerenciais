# Deploy do Sistema Gerenciais na Hostinger (VPS) — pagando com Pix

Guia passo a passo para colocar o **sistema-gerenciais** (Laravel 12 + React/Inertia + MySQL + Nginx) no ar numa **VPS da Hostinger** contratada com **Pix**.

> Este guia foi testado de ponta a ponta: build, subida dos containers, migrations, criação do admin e acesso via navegador.

---

## 1. Visão geral

A parte de produção já está pronta no repositório (feita e testada). Você só vai rodar comandos no servidor. Arquivos incluídos:

| Arquivo | Função |
| ------- | ------ |
| `Dockerfile.prod` | Imagem PHP 8.3-FPM + Node 22 + Composer (só as ferramentas) |
| `docker-compose.prod.yml` | Orquestra `app` (PHP), `nginx` (web) e `db` (MySQL 8) |
| `docker/nginx.prod.conf` | Configuração do Nginx para servir a aplicação |
| `.env.prod.example` | Modelo de variáveis de ambiente de produção (você copia para `.env`) |

Como funciona:

1. O código do servidor fica em `/var/www/sistema-gerenciais` e é **montado** nos containers `app` e `nginx` (mesma ideia do ambiente local).
2. Os containers `app` têm as ferramentas (composer, node) para instalar dependências e compilar o frontend (`public/build`).
3. O `nginx` serve os arquivos estáticos e envia as requisições PHP para o `app` (PHP-FPM).
4. O banco `db` guarda os dados num volume persistente (`db_data`).

---

## 2. Pré-requisitos

- Conta no GitHub com acesso ao repositório `danielbsn1/sistema-gerenciais`
- O repositório deve estar **público** no GitHub (mais simples) — se for privado, use um **Personal Access Token** no `git clone`
- Um domínio (ex.: `sistema.suaempresa.com.br`) — passo 11
- **Pix** para pagar a VPS

> **Recomendação de plano:** VPS **KVM 2 vCPU / 2 GB RAM** (Ubuntu 24.04). O build do frontend precisa de memória; com 2 GB roda tranquilo (1 GB dá, mas o passo 5 cria swap).

---

## 3. Contratar a VPS na Hostinger

1. Acesse https://www.hostinger.com.br/vps
2. Escolha um plano **KVM** (ex.: KVM 2) e sistema operacional **Ubuntu 24.04 LTS**
3. No checkout, selecione o período e em **forma de pagamento escolha Pix**
4. Após a confirmação, a Hostinger envia o **IP**, usuário (`root`) e **senha** por e-mail e mostra no painel
5. Anote o **IP do servidor** (ex.: `154.62.123.45`)

---

## 4. Acessar o servidor via SSH

No seu computador (Linux/Mac) ou PowerShell (Windows):

```bash
ssh root@SEU_IP
```

Use a senha que veio no e-mail. Você também pode cadastrar uma chave SSH no painel da Hostinger para acessar sem senha.

---

## 5. Configurações iniciais (swap + atualização)

O build do frontend pede memória. Crie **2 GB de swap**:

```bash
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

Atualize o sistema:

```bash
apt update && apt upgrade -y
```

> Opcional: `timedatectl set-timezone America/Sao_Paulo`

---

## 6. Instalar Docker e Docker Compose

```bash
curl -fsSL https://get.docker.com | sh
```

Verifique:

```bash
docker --version
docker compose version
```

---

## 7. Clonar o projeto

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/danielbsn1/sistema-gerenciais.git
cd sistema-gerenciais
```

> O repositório já contém os arquivos de produção (`Dockerfile.prod`, `docker-compose.prod.yml`, `docker/nginx.prod.conf`, `.env.prod.example`).

---

## 8. Criar o arquivo `.env` de produção

Copie o modelo e edite:

```bash
cp .env.prod.example .env
nano .env
```

Ajuste estes valores:

- `APP_URL=http://SEU_IP` → no início use o IP; depois do domínio, troque para `https://SEU_DOMINIO`
- `DB_PASSWORD=` e `DB_USERNAME` → **devem ser iguais** ao que você definir no `docker-compose.prod.yml` (passo 9)
- `APP_KEY=` → **deixe vazio**, o deploy gera automaticamente

> O `.env` **não** vai para o GitHub (está no `.gitignore`). Ele fica só no servidor.

---

## 9. Ajustar as senhas do banco no `docker-compose.prod.yml`

```bash
nano docker-compose.prod.yml
```

Troque os dois valores abaixo por senhas fortes (e use a mesma em `DB_PASSWORD` do `.env`):

```yaml
      MYSQL_PASSWORD: TROQUE_POR_UMA_SENHA_FORTE
      MYSQL_ROOT_PASSWORD: TROQUE_POR_OUTRA_SENHA_FORTE
```

---

## 10. Subir a aplicação e gerar a chave

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

O primeiro build baixa a imagem PHP e demora alguns minutos. Depois:

```bash
docker compose -f docker-compose.prod.yml exec app php artisan key:generate
```

Confira se os 3 containers estão de pé:

```bash
docker compose -f docker-compose.prod.yml ps
```

---

## 11. Instalar dependências e compilar o frontend

Este passo roda dentro do container (que já tem Composer e Node):

```bash
docker compose -f docker-compose.prod.yml exec app sh -c "composer install --no-dev --optimize-autoloader --no-interaction && npm ci && npm run build"
```

Na primeira vez demora alguns minutos. Ao final deve aparecer `✓ built in ...`.

---

## 12. Criar as tabelas, usuário admin e caches

**1. Migrations (cria as tabelas):**

```bash
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force
```

**2. Link do storage (para arquivos públicos):**

```bash
docker compose -f docker-compose.prod.yml exec app php artisan storage:link
```

**3. Permissões de escrita (importante):**

```bash
docker compose -f docker-compose.prod.yml exec app sh -c "chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache"
```

**4. Criar o usuário administrador** (evita os dados fictícios do seeder):

```bash
docker compose -f docker-compose.prod.yml exec app php artisan tinker
```

Dentro do Tinker, cole e ajuste o e-mail/senha:

```php
App\Models\User::updateOrCreate(
    ['email' => 'admin@suaempresa.com.br'],
    [
        'name'     => 'Administrador',
        'role'     => 'admin',
        'password' => bcrypt('SuaSenhaForte@123'),
    ],
);
```

Saia com `exit`.

> **Alternativa (não recomendada em produção):** `php artisan db:seed --force` cria o `admin@admin.com / password` **e insere dados fictícios** (funcionários, equipamentos, empréstimos, solicitações).

**5. Otimizar performance (caches de config, rotas e views):**

```bash
docker compose -f docker-compose.prod.yml exec app php artisan config:cache
docker compose -f docker-compose.prod.yml exec app php artisan route:cache
docker compose -f docker-compose.prod.yml exec app php artisan view:cache
```

**6. Teste no navegador:** acesse **http://SEU_IP** — deve abrir a tela de login.

---

## 13. Configurar domínio e SSL

### Caminho A (recomendado, grátis): Cloudflare

1. Crie uma conta em https://cloudflare.com e adicione seu domínio
2. Siga as instruções para apontar os **nameservers** para a Cloudflare (no registrador onde comprou o domínio)
3. Aguarde a propagação e, em **DNS → Records**, adicione:

   | Type | Name | Content | Proxy |
   | ---- | ---- | ------- | ----- |
   | A    | `@`      | SEU_IP | ✅ |
   | A    | `www`    | SEU_IP | ✅ |

4. Em **SSL/TLS → Overview**, selecione **Full**
5. Atualize o `APP_URL` no servidor e recarregue a config:

```bash
cd /var/www/sistema-gerenciais
sed -i 's|APP_URL=http://SEU_IP|APP_URL=https://SEU_DOMINIO|' .env
docker compose -f docker-compose.prod.yml exec app php artisan config:clear
docker compose -f docker-compose.prod.yml exec app php artisan config:cache
```

Acesse **https://SEU_DOMINIO**.

> Para forçar HTTPS, use a regra **Always Use HTTPS** (Redirect Rules) do Cloudflare — não precisa mexer no Nginx.

### Caminho B (opcional): Let's Encrypt direto no servidor

1. Instale o certbot:

```bash
apt install -y certbot
```

2. Pare o Nginx, emita o certificado e suba de novo:

```bash
cd /var/www/sistema-gerenciais
docker compose -f docker-compose.prod.yml stop nginx
certbot certonly --standalone -d SEU_DOMINIO --register-unsafely-without-email
docker compose -f docker-compose.prod.yml start nginx
```

3. Monte os certificados no Nginx adicionando ao `docker-compose.prod.yml`:

```yaml
  nginx:
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
```

4. Adicione o bloco 443 no `docker/nginx.prod.conf`:

```nginx
server {
    listen 443 ssl;
    server_name SEU_DOMINIO;

    ssl_certificate     /etc/letsencrypt/live/SEU_DOMINIO/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/SEU_DOMINIO/privkey.pem;

    root /var/www/public;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}

server {
    listen 80;
    server_name SEU_DOMINIO;
    return 301 https://$host$request_uri;
}
```

5. Recarregue:

```bash
docker compose -f docker-compose.prod.yml up -d nginx
```

---

## 14. Atualizar a aplicação (deploys futuros)

```bash
cd /var/www/sistema-gerenciais
git pull
docker compose -f docker-compose.prod.yml exec app sh -c "composer install --no-dev --optimize-autoloader --no-interaction && npm ci && npm run build"
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force
docker compose -f docker-compose.prod.yml exec app php artisan config:clear && docker compose -f docker-compose.prod.yml exec app php artisan config:cache route:cache view:cache
```

> Se o `Dockerfile.prod` ou o `docker-compose.prod.yml` mudarem, rode `docker compose -f docker-compose.prod.yml up -d --build` em vez do primeiro comando.

---

## 15. Backup do banco (agendado)

```bash
mkdir -p /root/backups
crontab -e
```

Adicione (troque pela sua senha):

```cron
0 3 * * * cd /var/www/sistema-gerenciais && docker compose -f docker-compose.prod.yml exec -T db sh -c 'mysqldump -usistema -pSUA_SENHA sistema_gerenciais' | gzip > /root/backups/db-$(date +\%F).sql.gz
0 3 * * * find /root/backups -name 'db-*.sql.gz' -mtime +7 -delete
```

Teste o backup em outro ambiente antes de confiar.

---

## 16. Problemas comuns

| Sintoma | Solução |
| ------- | ------- |
| `500` na primeira página | Rode `key:generate` (passo 10) e veja `docker compose -f docker-compose.prod.yml logs app` |
| Página sem CSS/JS (assets 404) | O `npm run build` não rodou ou falhou — repita o passo 11 |
| Erro de permissão em `storage/` | `docker compose -f docker-compose.prod.yml exec app sh -c "chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache"` |
| Build morre por falta de memória | Aumente o swap (passo 5) ou use plano com mais RAM |
| `SQLSTATE[HY000] ... access denied` | `DB_PASSWORD` no `.env` deve ser igual a `MYSQL_PASSWORD` do compose |
| Mudou o `.env` e não reflete | `php artisan config:clear` e depois `config:cache` |
| Página carrega assets de `localhost:5173` | Existe um arquivo `public/hot` (do Vite dev) — remova: `rm -f public/hot` e rode o build de novo |
| Login cai sozinho | `SESSION_DRIVER=database` precisa da tabela `sessions` — confirme que a migration rodou |

Logs:

```bash
docker compose -f docker-compose.prod.yml logs -f app      # Laravel/PHP
docker compose -f docker-compose.prod.yml logs -f nginx    # acesso/erros nginx
docker compose -f docker-compose.prod.yml exec app tail -f /var/www/storage/logs/laravel.log
```

---

## 17. (Opcional) Configurar e-mail real

O projeto envia notificações por e-mail (importações, status de solicitações) — hoje com `MAIL_MAILER=log` elas só aparecem no log. Para e-mail real, configure um SMTP (ex.: e-mail da Hostinger, Zoho, ou chave SMTP):

```env
MAIL_MAILER=smtp
MAIL_HOST=mail.seu-dominio.com
MAIL_PORT=465
MAIL_USERNAME=no-reply@seu-dominio.com
MAIL_PASSWORD=SUA_SENHA
MAIL_FROM_ADDRESS="no-reply@seu-dominio.com"
MAIL_FROM_NAME="${APP_NAME}"
MAIL_ENCRYPTION=ssl
```

Depois:

```bash
docker compose -f docker-compose.prod.yml exec app php artisan config:clear
docker compose -f docker-compose.prod.yml exec app php artisan config:cache
```

---

## Comandos principais (resumo)

```bash
# Subir/atualizar os containers
docker compose -f docker-compose.prod.yml up -d --build

# Instalar deps + compilar frontend
docker compose -f docker-compose.prod.yml exec app sh -c "composer install --no-dev --optimize-autoloader --no-interaction && npm ci && npm run build"

# Migrations + caches
docker compose -f docker-compose.prod.yml exec app php artisan migrate --force
docker compose -f docker-compose.prod.yml exec app php artisan config:cache route:cache view:cache

# Logs
docker compose -f docker-compose.prod.yml logs -f app

# Parar tudo
docker compose -f docker-compose.prod.yml down
```

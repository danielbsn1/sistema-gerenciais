

---

##  Sistema de Equipamentos (README)


#  Sistema de Gerenciamento de Equipamentos

Sistema web para controle e rastreamento de ativos de TI.

##  Tecnologias
- Laravel
- PHP
- MySQL
- Blade

##  Funcionalidades
- Cadastro de equipamentos
- Associação com usuários/setores
- Histórico de movimentações
- Controle de ativos de TI

##  Como rodar

```bash
git clone https://github.com/danielbsn1/NOME-DO-REPO
cd projeto
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve

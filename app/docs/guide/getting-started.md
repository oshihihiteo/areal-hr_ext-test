# Начало работы

## Требования

- Node.js 22+
- Docker и Docker Compose
- PostgreSQL 17
- npm или pnpm

## Установка

```bash
git clone https://github.com/oshihihiteo/areal-hr_ext-test
cd areal-hr_ext-test-2025
npm install
```
## Запуск приложения
```bash
docker-compose up --build
```

Откройте http://localhost:3000 (или иной указанный вами порт) для доступа к приложению.

Перед запуском проекта создайте и заполните файл .env в корне проекта и заполните его в соответствии с примером .env.example
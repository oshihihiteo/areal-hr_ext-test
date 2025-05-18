# Backend

## Описание

Backend написан на NodeJS. Используется PostgreSQL для хранения данных о сотрудниках, операциях, отделах и должностях.

## Миграции

Используется `node-pg-migrate`.

```bash
npm run migrate up
```

## Эндпоинты

### Сотрудники
- GET /employees — получить список сотрудников
- POST /employees — создать нового сотрудника
- PUT /employees/:id — обновить информацию о сотруднике
- DELETE /employees/:id — удалить сотрудника

### Кадровые операции
- GET /hr-operations — получить список кадровых операций
- POST /hr-operations — создать кадровую операцию
- PUT /hr-operations/:id — обновить кадровую операцию
- DELETE /hr-operations/:id — удалить кадровую операцию

### Пользователи
- GET /users — получить список пользователей
- POST /users — создать пользователя
- PUT /users/:id — обновить пользователя
- DELETE /users/:id — удалить пользователя

### Отделы
- GET /departments — получить список отделов
- POST /departments — создать отдел
- PUT /departments/:id — обновить отдел
- DELETE /departments/:id — удалить отдел

### Организации
- GET /organizations — получить список организаций
- POST /organizations — создать организацию
- PUT /organizations/:id — обновить организацию
- DELETE /organizations/:id — удалить организацию

### Должности
- GET /positions — получить список позиций
- POST /positions — создать позицию
- PUT /positions/:id — обновить позицию
- DELETE /positions/:id — удалить позицию

### Файлы
- GET /files — получить список загруженных файлов
- POST /files — загрузить файл
- PUT /files/:id — обновить файл
- DELETE /files/:id — удалить файл
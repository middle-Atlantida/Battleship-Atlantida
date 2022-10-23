# Battleship-Atlantida

- [Heroku](https://limitless-taiga-49611.herokuapp.com/)
- Heroku project name - `limitless-taiga-49611`
## Команды

- `npm i` - установка зависимостей
- `npm start` - запуск вебпак девсервера для локальной разработки
- `npm run build` - сборка билда
- `npm run test` - запуск тестов
- `npm run test:update` - запуск тестов с обновлением снепшотов
- `npm run check` - запуск проверки eslint, stylelint и ts
- `npm run fix` - запуск автофикса eslint и stylelint
- `npm run clean` - удаление node_modules

## Релиз

### Локальный запуск docker-compose c БД
1. Сборка и запуск всех контейнеров
```bash
docker-compose up
```

2. Остановка всех контейнеров
```
Выполняется сочетанием клавиш Ctrl+C или CMD+C
```
3. Удаление контейнеров
```bash
docker-compose down
```

## Доступ к postgres
- localhost: `5432`
- Username: `postgres` (default)
- Password: `postgres` (default)

## Доступ к PgAdmin
- URL: `http://localhost:8080`
- Username: `pgadmin4@pgadmin.org` (default)
- Password: `admin` (default)

### Локальный запуск докера
1. Сборка докер образа
```bash
docker build -t atlantida .
```
2. Запуск приложения на 4000ом локальном порту
```bash
docker run -p 4000:3000 -d atlantida
```
3. Провераем запущенные контейнеры
```bash
docker ps
```
4. Останавливаем контейнер
```bash
docker stop -t 0 [CONTAINER ID | NAMES]
```

### Предустановка релизных компонентов
1. Установка heroku
```bash
brew install heroku
```
2. Авторизация в heroku
```bash
heroku login
```
3. Авторизация в контейнере heroku
```bash
heroku container:login
```

### Релиз на продакшен

1. Сборка докер образа
```bash
docker build -t registry.heroku.com/limitless-taiga-49611/web .
```
2. Пуш докер образа
```bash
docker push registry.heroku.com/limitless-taiga-49611/web
```
3. Релиз запушенного докер образа
```bash
heroku container:release web -a limitless-taiga-49611
```

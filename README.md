## Project to learn React framework (January 2022)

Server side rendering React app. This application can request news from newsapi.org and show them in cards-components.

Development began with using JavaScript and class components, later it was transitioned to TypeScript and functional components.
*Project was made from scratch without out-of-box solutions like create-react-app, next.js, etc.*

### How to use:
- clone this repo;
- `git checkout react-ssr` will transfer you to last implemented branch;
- `npm i` to install dependencies;
- `npm run build:all` to build client and server;
- `npm run start:server` to start a server (default port 3000);

### Branches description (in implementation order):
- `react-components` - setting up webpack for react-project (dev/prod config + eslint with airbnb config, prettier), creation of test component;
- `react-forms` - creation of forms that going to be used to collect information (input, select, checkbox, switcher). Implementation of fields content validation. Cards with collected info will be generated on form submit;
- `react-api` - search field implementation. On input event field generates api request to newsapi.org, results will be shown on a page. Implementation of sorting, pagination, loading indication;
- `react-router` - Transition development to using functional components. Implement dummy page, 404 page and navigation between all existing pages using react-router. Add page transition animation. Add the ability to check details of specific news - implemented using detailed request to api.
- `react-redux` - configure store, add provider, move api requests and data exchange of components to redux.
- `react-testing` - cover the functionality with tests (jest + react-testing-library);
- `react-ssr` - implement Isomorphic React App without using ready-made solutions. Express server was used, it generates template which later hydrates on a client side.

___

## Учебный проект по изучению фреймворка React. (Январь 2022)

React-SSR-приложение для запроса новостей с newsapi.org и последующего отображения их в карточках-компонентах.

Начало разработки на JavaScript и классовых компонентах, в процессе был сделан переход на TypeScript и функциональные компоненты. 
*Проект создан без использования готовых решений, таких как create-react-app, next.js, etc.*
Разработка велась последовательно, каждая последующая ветка репозитория дополняет предыдущую.

### Чтобы запустить это приложение:
- склонируйте этот репозиторий;
- `git checkout react-ssr` перейти в актуальную ветку;
- `npm i` установить зависимости;
- `npm run build:all` запускает билд клиентской и серверной части;
- `npm run start:server` стартует сервер (порт по умолчанию 3000);

### Описание веток (в порядке реализации):
- `react-components` - настройка webpack для react-проекта (dev/prod конфигурация + eslint с конфигом airbnb, prettier), создание тестового компонента.
- `react-forms` - создание формы для сбора информации (поля input, select, checkbox, switcher), последующей валидации полей. По сабмиту генерируются карточки пользователей с собранной информацией.
- `react-api` - строка поиска, по введенному тексту осуществляется запрос к api (newsapi.org), на странице отображаются результаты. Есть возможность сортировки, переключатели пагинации, индикация загрузки.
- `react-router` - переход на функциональные компоненты, добавлена страница-заглушка, страница 404 и с помощью react-router реализована навигация. Переход между страницами с анимацией, также реализовано получение подробных данных о конкретной новости путем формирования детального запроса к api.
- `react-redux` - конфигурация store, добавление provider, перенос работы с api и данными из компонентов в redux.
- `react-testing` - написание юнит-тестов (jest + react-testing-library)
- `react-ssr` - реализация Isomorphic React App без использования готовых решений. Использован сервер express, сервер генерирует template, гидрация которого осуществляется на стороне клиента.

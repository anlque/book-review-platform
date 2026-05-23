## Run project

```
npm install - install deps
npm run start:dev or npm run start:dev:vite - start server + frontend project in dev mode
```

----

## Scripts

- `npm run start` - Start frontend project on webpack dev server
- `npm run start:vite` - Start frontend project on vite
- `npm run start:dev` - Start frontend project on webpack dev server + backend
- `npm run start:dev:vite` - Start frontend project on vite + backend
- `npm run start:dev:server` - Start backend server
- `npm run build:prod` - Build in prod mode
- `npm run build:dev` - Build in dev mode 
- `npm run lint:ts` - Check ts files by linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files style by linter
- `npm run lint:scss:fix` - Fix scss files style with linter
- `npm run test:unit` - Start unit tests with jest
- `npm run storybook` - Start Storybook
- `npm run storybook:build` - Build storybook 
- `npm run prepare` - Pre-commit hooks
- `npm run generate:slice` - Script for FSD slices generation

----

## Project architecture

Project is written based on Feature sliced design methodology 

Methodology documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Work with translations

The app uses **react-i18next**. JSON namespaces live in `public/locales/{locale}/{namespace}.json`.

**Intlayer** is configured as a dev tool on top of i18next (no runtime change): it syncs those JSON files and can auto-fill missing keys in additional langs via AI.

| Command | Description |
| --- | --- |
| `npm run i18n:test` | List missing translations (`en` → `ru`) |
| `npm run i18n:fill` | Fill missing keys (requires API key in `.env`) |

1. Copy `.env.example` → `.env` and set `OPENAI_API_KEY`.
2. Run `npm run i18n:fill` after adding new English strings.

Config: `intlayer.config.ts`. Generated cache: `.intlayer/` (gitignored).

- [react-i18next](https://react.i18next.com/)
- [Intlayer + react-i18next](https://intlayer.org/blog/intlayer-with-react-i18next)

----

## Tests

4 types of tests are used in the project:
1) Usual unit tests on jest - `npm run test:unit`
2) Component tests with React testing library -`npm run test:unit`
3) Screenshot tests with storybook (in progress) `npm run test:ui`
4) e2e testing with Cypress (in progress) `npm run test:e2e`

----

## Linting

Eslint is used for checking typescript code and stylelint for checking css files.

##### Run linters
- `npm run lint:ts` - Check ts files by linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files by style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

----
## Storybook

For every component in the project there is storybook story.
Server requests are mocked with storybook-addon-mock.

File with story cases is created next to the component with extension .stories.tsx

Start storybook with command:
- `npm run storybook`

Documentation [Storybook](/docs/storybook.md)

----

## Project configuration

The project has 2 configs for developing:
1. Webpack - ./config/build
2. vite - vite.config.ts
 
Both builders are adapted for main app features.

All configs are stored in /config
- /config/babel - babel
- /config/build - webpack
- /config/jest - testing
- /config/storybook - storybook

`scripts` folder has different scripts for refactor/simplifying writing code.

----

## CI pipeline & pre commit hooks

Github actions config is in /.github/workflows.
Ci runs all tests, building project & storybook, linting.

Pre-commit hooks check project with linters, config is placed in /.husky

----

### Data management

Data is managed by redux toolkit.
Reusable entities should be normalised with EntityAdapter

Server requests are sent with [RTK query](/src/shared/api/rtkApi.ts)

DynamicModuleLoader is used for async reducers (to prevent adding them to common bundle)
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx)

----

### Feature-flag management

Feature flags are allowed to be used only within toggleFeatures helper
It takes object with options:

{
name: feature-flag name,
on: function that will run after turning on the feature 
of: function that will run after turning off the feature
}

Use script remove-feature.ts to automatically delete the feature,
it takes 2 args
1. Feature-flag name
2. Feature-flag state (on\off)

----

## Entities

- [Book](/src/entities/Book)
- [Comment](/src/entities/BookReview)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/Country)
- [Currency](/src/entities/Currency)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [bookEditForm](/src/features/bookEditForm)
- [bookRating](/src/features/bookRating)
- [bookRecommendationsList](/src/features/bookRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/avatarDropdown)
- [editableProfileCard](/src/features/editableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/notificationButton)
- [profileRating](/src/features/profileRating)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [UI](/src/features/UI)

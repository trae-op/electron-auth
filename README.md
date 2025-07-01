# Electron Auth Project

- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Project Setup](#project-setup)
  - [Clone the repository](#clone-the-repository)
  - [Install dependencies](#install-dependencies)
  - [Database Setup (Prisma & PostgreSQL/SQLite)](#database-setup-prisma--postgresqlsqlite)
  - [Google OAuth Configuration](#google-oauth-configuration)
- [Scripts Overview](#scripts-overview)
- [Dependencies](#dependencies)
- [Build & Distribution](#build--distribution)
  - [Configuration Notes for `electron-builder`](#configuration-notes-for-electron-builder)

This repository serves as a robust boilerplate for starting new Electron.js desktop applications. It comes pre-configured with essential features and a modern development stack, allowing developers to quickly bootstrap their projects.

## Key Features

- **Application Updates:** Seamless application updates are implemented and configured using `electron-updater` and `electron-builder`, ensuring your users always have the latest version of your application.
- **Google Authentication:** A complete Google OAuth 2.0 authentication flow is integrated, providing a secure way for users to log in with their Google accounts.
- **Modern Development Stack:** Built with a powerful combination of contemporary web technologies.

## Technologies Used

- **Electron.js:** For building cross-platform desktop applications using web technologies.
- **React.js:** A popular JavaScript library for building user interfaces.
- **MUI (Material-UI):** A comprehensive React UI framework that implements Google's Material Design, providing ready-to-use and customizable components.
- **Vite:** A fast and efficient build tool that significantly improves the development experience for modern web projects.
- **TypeScript:** For type-safe JavaScript development, enhancing code quality and maintainability.
- **Prisma:** A modern database toolkit (ORM) for interacting with databases (e.g., PostgreSQL, SQLite), used for managing user data.
- **electron-builder:** A complete solution to package and distribute ready-for-distribution Electron applications.
- **electron-log:** A flexible logging library for Electron applications.
- **electron-store:** A simple data persistence solution for Electron apps, useful for storing user preferences and tokens.

## Project Setup

To get started with this project, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/trae-op/electron-auth.git](https://github.com/trae-op/electron-auth.git)
    cd electron-auth
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

    The `postinstall` script will automatically run `prisma generate` after installation.

3.  **Database Setup (Prisma & PostgreSQL/SQLite):**

    - Ensure you have a PostgreSQL database running and configured, or use the default SQLite setup.
    - Update `prisma/.env` with your `DATABASE_URL`.
    - Run Prisma migrations to set up your database schema:
      ```bash
      npm run prisma:migrate:dev # For development migrations
      # or
      npm run prisma:push # For quick schema push (development only, no history)
      ```

4.  **Google OAuth Configuration:**
    - Create a Google OAuth 2.0 Client ID of type "Desktop app" in the Google Cloud Console.
    - Update `src/main/config/appConfig.ts` (or your environment variables) with your `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and ensure `GOOGLE_REDIRECT_URI` matches your setup (e.g., `http://localhost:8080/oauth2callback`).

## Scripts Overview

The `package.json` includes a comprehensive set of scripts to manage the development, testing, and build processes:

- **`dev`**: `npm-run-all --parallel dev:react dev:electron`
  - Starts both the React development server (`dev:react`) and the Electron application in development mode (`dev:electron`) concurrently. This is your primary command for local development.
- **`dev:react`**: `vite`
  - Launches the Vite development server for the React frontend.
- **`dev:electron`**: `npm run transpile:electron && cross-env NODE_ENV=development electron .`
  - Transpiles the Electron main process code (`transpile:electron`) and then starts the Electron application in development mode. `cross-env NODE_ENV=development` sets the environment variable for development-specific logic.
- **`build`**: `tsc -b && vite build`
  - Performs a full build: first, it compiles TypeScript for both main and renderer processes (`tsc -b`), then it builds the React frontend for production using Vite.
- **`lint`**: `eslint .`
  - Runs ESLint across the entire project to enforce code style and identify potential issues.
- **`preview`**: `vite preview`
  - Serves the production build of the React frontend locally for previewing.
- **`test:e2e`**: `playwright test`
  - Executes end-to-end tests using Playwright.
- **`test:unit`**: `vitest src`
  - Runs unit tests located in the `src` directory using Vitest.
- **`open:mac:prod`**: `./dist/mac/electron-auth.app/Contents/MacOS/electron-auth`
  - A utility script to directly open the built macOS application from the `dist` folder. Useful for quick testing of the production build.
- **`transpile:electron`**: `tsc --project src/main/tsconfig.json`
  - Compiles only the TypeScript code specifically for the Electron main process, based on its dedicated `tsconfig.json`.
- **`build:mac`**: `npm run transpile:electron && npm run build && electron-builder --mac --x64`
  - Builds the application for macOS (64-bit). It first transpiles Electron code, then builds the entire project, and finally uses `electron-builder` to package it for macOS.
- **`build:win`**: `npm run transpile:electron && npm run build && electron-builder --win --x64`
  - Builds the application for Windows (64-bit), following a similar process to the macOS build.
- **`build:linux`**: `npm run transpile:electron && npm run build && electron-builder --linux --x64`
  - Builds the application for Linux (64-bit), following a similar process to the macOS/Windows builds.
- **`prisma:push`**: `prisma db push`
  - Pushes the Prisma schema changes directly to the database. This is a quick way to sync your schema in development but does not create migration files.
- **`prisma:studio`**: `prisma studio`
  - Launches Prisma Studio, a visual editor for your database, allowing you to view and manage your data.
- **`postinstall`**: `prisma generate`
  - This script automatically runs `prisma generate` after `npm install` (or `yarn install`), ensuring that the Prisma Client is always up-to-date and generated for the correct environment.

## Dependencies

Key dependencies include:

- **React 19 & ReactDOM 19:** Core React libraries.
- **MUI (Material-UI) 7.0.1:** UI components.
- **Prisma 6.10.1 & @prisma/client:** Database ORM.
- **electron 35.0.2:** The Electron framework itself.
- **electron-updater 6.3.9 & electron-builder 25.1.8:** For app updates and packaging.
- **electron-log 5.4.1:** For robust logging.
- **electron-store 10.1.0:** For simple, persistent data storage.
- **jsonwebtoken 9.0.2 & @types/jsonwebtoken:** For working with JSON Web Tokens (e.g., ID tokens from Google Auth).
- **dotenv 16.4.7:** For loading environment variables.
- **lodash & lodash.isequal:** Utility libraries.
- **react-router-dom 7.4.1:** For client-side routing.

## Build & Distribution

The project uses `electron-builder` for packaging and distributing the application. The `build:mac`, `build:win`, and `build:linux` scripts handle the entire process, creating distributable files in the `dist` directory.

### Configuration Notes for `electron-builder`:

- **`main` field in `package.json`**: Points to `dist-main/app.js`, indicating the compiled entry point for the Electron main process.
- **`files` and `extraResources`**: Ensure that all necessary files, including Prisma engines and any other native modules or assets, are correctly included in the final build. The current setup should handle most cases, but if you encounter issues with missing files, check the `files` and `extraResources` arrays in your `electron-builder` configuration (often defined directly in `package.json` under the `build` key or in a separate `electron-builder.yml` file).
- **`version` field**: The `version` in `package.json` is crucial for `electron-updater` to determine if a new update is available. Increment this version number for each new release.

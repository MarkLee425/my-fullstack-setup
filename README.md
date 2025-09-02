# My Fullstack Setup

A modern, monorepo fullstack application setup with TypeScript, React, React Native (Expo), Fastify, and PostgreSQL.

## Architecture

This project is structured as a monorepo with the following components:

- **Web**: Next.js 15 application (port 8016)
- **Native**: Expo (React Native) application for iOS and Android
- **Server**: Fastify backend with PostgreSQL and Redis
- **Packages**: Shared constants and UI components

### Tech Stack

| Layer    | Technology         | Purpose                   |
|----------|--------------------|---------------------------|
| Frontend | React 19, Next.js 15 | Web application           |
| Mobile   | React Native, Expo | Native mobile application |
| Backend  | Fastify            | API server                |
| Database | PostgreSQL         | Primary database          |
| Cache    | Redis              | Caching and sessions      |
| Auth     | Better Auth        | Authentication system     |
| API      | tRPC               | Type-safe API endpoints   |
| Styling  | Tailwind CSS       | Utility-first CSS         |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (for database and cache services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-fullstack-setup
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Copy the example env file
cp .env.docker.example .env.docker
# Edit with your values
```

4. Initialize the development environment:
```bash
pnpm run setup
```

This will:
- Start PostgreSQL and Redis containers
- Run database migrations
- Set up all required services

### Development

Start all services in development mode:

```bash
# Start all apps (web, native, server)
pnpm run dev

# Or start individual apps:
pnpm run dev:web      # Next.js web app
pnpm run dev:native   # Expo mobile app
pnpm run dev:server   # Fastify server
```

### Database Management

The project includes database migration tools:

```bash
pnpm run db:up        # Start database container
pnpm run db:down      # Stop database container
pnpm run db:migrate:up    # Run migrations
pnpm run db:migrate:down  # Revert last migration
pnpm run db:migrate:full  # Reset and run all migrations
```

## Project Structure

```
my-fullstack-setup/
├── apps/
│   ├── native/       # Expo React Native app
│   ├── server/       # Fastify backend server
│   └── web/          # Next.js web application
├── packages/
│   ├── constants/    # Shared constants and types
│   └── ui/           # Shared UI components
├── .env.docker       # Docker environment configuration
└── turbo.json        # Turborepo configuration
```

## Available Scripts

### Root Scripts

| Script            | Description                           |
|-------------------|---------------------------------------|
| `pnpm run dev`    | Start all development servers         |
| `pnpm run build`  | Build all applications                |
| `pnpm run clean`  | Clean build artifacts                 |
| `pnpm run setup`  | Initialize development environment    |
| `pnpm run check`  | Check code formatting with Biome      |
| `pnpm run format` | Format code with Biome                |

### Server Scripts

| Script                 | Description                        |
|------------------------|------------------------------------|
| `pnpm run dev:server`  | Start Fastify development server   |
| `pnpm run db:*`        | Database management commands       |
| `pnpm run redis:*`     | Redis management commands          |

### Web Scripts

| Script              | Description                     |
|---------------------|---------------------------------|
| `pnpm run dev:web`  | Start Next.js development server|

### Native Scripts

| Script                | Description                    |
|-----------------------|--------------------------------|
| `pnpm run dev:native` | Start Expo development server  |
| `pnpm run ios`        | Run on iOS simulator           |
| `pnpm run android`    | Run on Android emulator        |

## Authentication

The project uses [Better Auth](https://www.better-auth.com/) for authentication, which provides:
- Email/password authentication
- Social login providers
- Session management
- Password reset flows
- Two-factor authentication (2FA)

## API Integration

API communication is handled through tRPC with:
- Type-safe endpoints
- React Query integration for data fetching
- Automatic API documentation generation

## UI Components

Shared UI components are built with:
- Tailwind CSS for styling
- Radix UI for accessible primitives
- Lucide React for icons
- Custom component library in `packages/ui`

## Testing

Testing is configured but not yet implemented. Future plans include:
- Jest for unit testing
- Playwright for E2E testing
- React Testing Library for component tests

## Deployment

Deployment configurations are not included in this setup. You'll need to:
1. Configure your deployment platform (Vercel, Netlify, etc.)
2. Set up environment variables
3. Configure database connections
4. Set up CI/CD pipelines

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Turborepo](https://turbo.build/repo) for monorepo management
- [Next.js](https://nextjs.org/) for the React framework
- [Expo](https://expo.dev/) for mobile development
- [Fastify](https://www.fastify.io/) for the backend framework
- [Better Auth](https://www.better-auth.com/) for authentication
- [tRPC](https://trpc.io/) for type-safe APIs
```
my-fullstack-setup
├─ .husky
│  ├─ _
│  │  ├─ applypatch-msg
│  │  ├─ commit-msg
│  │  ├─ h
│  │  ├─ husky.sh
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-rewrite
│  │  ├─ pre-applypatch
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-merge-commit
│  │  ├─ pre-push
│  │  ├─ pre-rebase
│  │  └─ prepare-commit-msg
│  └─ pre-commit
├─ .npmrc
├─ LICENSE
├─ README.md
├─ apps
│  ├─ client
│  │  ├─ .dockerignore
│  │  ├─ .react-router
│  │  │  └─ types
│  │  │     ├─ +future.ts
│  │  │     ├─ +routes.ts
│  │  │     ├─ +server-build.d.ts
│  │  │     └─ app
│  │  │        ├─ +types
│  │  │        │  └─ root.ts
│  │  │        └─ routes
│  │  │           └─ +types
│  │  │              └─ home.ts
│  │  ├─ Dockerfile
│  │  ├─ README.md
│  │  ├─ app
│  │  │  ├─ app.css
│  │  │  ├─ root.tsx
│  │  │  ├─ routes
│  │  │  │  └─ home.tsx
│  │  │  ├─ routes.ts
│  │  │  └─ welcome
│  │  │     ├─ logo-dark.svg
│  │  │     ├─ logo-light.svg
│  │  │     └─ welcome.tsx
│  │  ├─ package.json
│  │  ├─ public
│  │  │  └─ favicon.ico
│  │  ├─ react-router.config.ts
│  │  ├─ tsconfig.json
│  │  └─ vite.config.ts
│  ├─ native
│  │  ├─ app
│  │  │  ├─ (drawer)
│  │  │  │  ├─ (tabs)
│  │  │  │  │  ├─ _layout.tsx
│  │  │  │  │  ├─ index.tsx
│  │  │  │  │  └─ two.tsx
│  │  │  │  ├─ _layout.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ +html.tsx
│  │  │  ├─ +not-found.tsx
│  │  │  ├─ _layout.tsx
│  │  │  └─ modal.tsx
│  │  ├─ app-env.d.ts
│  │  ├─ app.json
│  │  ├─ assets
│  │  │  ├─ adaptive-icon.png
│  │  │  ├─ favicon.png
│  │  │  ├─ icon.png
│  │  │  └─ splash.png
│  │  ├─ babel.config.js
│  │  ├─ components
│  │  │  ├─ container.tsx
│  │  │  ├─ header-button.tsx
│  │  │  ├─ sign-in.tsx
│  │  │  ├─ sign-up.tsx
│  │  │  └─ tabbar-icon.tsx
│  │  ├─ global.css
│  │  ├─ lib
│  │  │  ├─ auth-client.ts
│  │  │  ├─ constants.ts
│  │  │  └─ use-color-scheme.ts
│  │  ├─ metro.config.js
│  │  ├─ nativewind-env.d.ts
│  │  ├─ package.json
│  │  ├─ tailwind.config.js
│  │  ├─ tsconfig.json
│  │  └─ utils
│  │     └─ trpc.ts
│  ├─ server
│  │  ├─ Dockerfile
│  │  ├─ docker-compose-dev.yml
│  │  ├─ docker-compose-prod.yml
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ db
│  │  │  │  └─ postgres
│  │  │  │     └─ migrations
│  │  │  │        └─ 1755942169322_init.ts
│  │  │  ├─ helpers
│  │  │  │  └─ image.ts
│  │  │  ├─ index.ts
│  │  │  ├─ lib
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ config.ts
│  │  │  │  ├─ context.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ queue.ts
│  │  │  │  ├─ redis.ts
│  │  │  │  └─ trpc.ts
│  │  │  ├─ routers
│  │  │  │  └─ index.ts
│  │  │  ├─ services
│  │  │  │  └─ email.ts
│  │  │  └─ utils
│  │  │     ├─ date-time.ts
│  │  │     └─ password.ts
│  │  └─ tsconfig.json
│  └─ web
│     ├─ components.json
│     ├─ next.config.ts
│     ├─ package.json
│     ├─ postcss.config.mjs
│     ├─ src
│     │  ├─ app
│     │  │  ├─ dashboard
│     │  │  │  └─ page.tsx
│     │  │  ├─ favicon.ico
│     │  │  ├─ layout.tsx
│     │  │  ├─ login
│     │  │  │  └─ page.tsx
│     │  │  └─ page.tsx
│     │  ├─ components
│     │  │  ├─ header.tsx
│     │  │  ├─ loader.tsx
│     │  │  ├─ mode-toggle.tsx
│     │  │  ├─ providers.tsx
│     │  │  ├─ sign-in-form.tsx
│     │  │  ├─ sign-up-form.tsx
│     │  │  ├─ theme-provider.tsx
│     │  │  └─ user-menu.tsx
│     │  ├─ index.css
│     │  ├─ lib
│     │  │  └─ auth-client.ts
│     │  └─ utils
│     │     └─ trpc.ts
│     └─ tsconfig.json
├─ biome.json
├─ package.json
├─ packages
│  ├─ constants
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ index.ts
│  │  │  └─ password.ts
│  │  ├─ tsconfig.build.json
│  │  └─ tsconfig.json
│  ├─ ts-config
│  │  ├─ base.json
│  │  ├─ nextjs.json
│  │  ├─ package.json
│  │  ├─ react-app.json
│  │  ├─ react-library.json
│  │  └─ server.json
│  └─ ui
│     ├─ components.json
│     ├─ package.json
│     ├─ postcss.config.mjs
│     ├─ src
│     │  ├─ components
│     │  │  ├─ button.tsx
│     │  │  ├─ card.tsx
│     │  │  ├─ checkbox.tsx
│     │  │  ├─ dropdown-menu.tsx
│     │  │  ├─ input.tsx
│     │  │  ├─ label.tsx
│     │  │  ├─ skeleton.tsx
│     │  │  └─ sonner.tsx
│     │  ├─ hooks
│     │  ├─ lib
│     │  │  └─ utils.ts
│     │  └─ styles
│     │     └─ globals.css
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
└─ turbo.json

```
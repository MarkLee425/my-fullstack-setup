# My Fullstack Setup

A modern, monorepo fullstack application setup with TypeScript, React, React Native (Expo), Fastify, and PostgreSQL.

### Tech Stack

| Layer    | Technology               | Purpose                          |
|----------|--------------------------|----------------------------------|
| Frontend | React 19 (Vite, Router 7)| Web application with routing     |
| Mobile   | React Native, Expo       | Native mobile application        |
| Backend  | Fastify                  | API server                       |
| Database | PostgreSQL               | Primary database                 |
| Cache    | Redis                    | Caching and sessions             |
| Auth     | Better Auth              | Authentication system            |
| API      | tRPC                     | Type-safe API endpoints          |
| Styling  | Tailwind CSS             | Utility-first CSS                |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker (for database and cache services)

### First-Time Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd my-fullstack-setup
```

2. Run the initialization script (this handles dependencies, environment setup, and project configuration):
```bash
sh scripts/init.sh
```

3. Run database migrations:
```bash
cd apps/server && pnpm db:migrate:full && cd ../..
```

4. Start development:
```bash
pnpm dev
```

The initialization script will:
- Install all dependencies with pnpm
- Create new key for encryption & decryption
- Decrypt and set up environment files
- Docker compose up all services except server
- Configure .gitignore settings
- Set up the project structure

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
│   ├── native/           # Expo React Native app
│   ├── scraper/          # Python web scraper service
│   ├── server/           # Fastify backend server
│   └── web/              # React + Vite web application
├── packages/
│   ├── constants/        # Shared constants and types
│   ├── design-system/    # Design system components and tokens
│   ├── ts-config/        # Shared TypeScript configurations
│   └── ui/               # Shared UI components
├── scripts/
│   └── init.sh           # First-time setup script
├── .env.keys             # Environment asymmetric private keys
├── .github/              # GitHub workflows, copilot and configurations
├── .vscode/              # VS Code workspace settings
├── biome.json            # Biome linter and formatter config
├── turbo.json            # Turborepo configuration
└── pnpm-workspace.yaml   # Pnpm workspace configuration
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
| `pnpm run dev:web`  | Start Vite development server   |

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
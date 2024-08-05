# Verida Nextwork Explorer

## Development

This is a Next.js application that uses the Verida Network SDK and API to display data from the Verida Network.

### Node version

For consistency, we recommend using the same Node version as the one used in the CI and the Production deployment. You can use `nvm` to switch to the correct version.

A `.nvmrc` defines the Node version used by the project, use it by running:

```
nvm use
```

### Install

Install the dependencies with `yarn` by running:

```
yarn install
```

Some environment variables are required for the application to run. Have a look at the provided examples.

Copy `.env.example`, rename it to `.env.local` and modify the variables for your local environment:

```
cp .env.example .env.local
```

### Run

The application can be started with its dedicated development server supporting hot reloading:

```
yarn run dev
```

Alternatively (actually preferably), you can run the application in debug mode with the provided VS Code launch configurations. Use the `Next.js debug full stack`.

### Linting and Formatting

We use eslint for the linting and prettier for the formatting.

Scripts are available to check and fix issues:

```
yarn run check
```

```
yarn run fix
```

## Guidelines

The repository uses the following:

- Typescript
- Next.js framework
- Tailwind CSS for styling
- Radix and Shadcn/ui for the base components
- `app` folder for the routing and page-related components
- `components` folder to organise shared components
- `features` folder to organise the logic by features
- `config` folder to validate and expose the environment variables and configuration

### Build

To build the application for production, run:

```
yarn run build
```

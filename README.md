# Next.js SAAS Boilerplate

![Project intro image]

Welcome to the _Next.js SAAS Boilerplate_, a template for SAAS projects! It's has all the features that'll help you jumpstart and build a high-performance, maintainable, and enjoyable app. 

## Features

With this template, you get all the awesomeness you need:

## Features

With this template, you get a versatile, efficient starting point, equipped with:

- 🏎️ **[Next.js](https://nextjs.org/)** - Optimized for speed, providing a top-notch developer experience.
- ⚛️ **[React](https://reactjs.org/)** - Build powerful and interactive UIs with this JavaScript library.
- 🛠️ **[TypeScript](https://www.typescriptlang.org/)** - Supercharges JavaScript with static types.
- 🧶 **[Yarn](https://yarnpkg.com/)** - Fast, reliable, and secure dependency management.
- 💅 **[Tailwind CSS](https://tailwindcss.com/)** - Rapidly craft modern designs with this utility-first CSS framework.
- 🖼️ **[Framer Motion](https://framer.com/motion/)** - Animate components with this production-ready motion library.
- 🪐 **[Prisma](https://www.prisma.io/)** - Modern database access for TypeScript & Node.js.
- 🧪 **[Zustand](https://github.com/pmndrs/zustand)** - Small and fast state-management solution.
- 🧑‍💼 **[Clerk Authentication](https://clerk.dev/)** - Secure and scalable authentication for Next.js.
- 🧠 **[Sanity](https://www.sanity.io/)** - Structured content CMS built with JavaScript and React.
- 💳 **[Stripe](https://stripe.com/)** - Comprehensive and secure solution for online payments.
- 🔗 **[Svix](https://www.svix.com/)** - Effortlessly manage your application’s APIs.
- ✨ **[ESlint](https://eslint.org/)** - Pluggable JavaScript linter to maintain code quality.
- 🖋️ **[Prettier](https://prettier.io/)** - Ensure consistent code style across your project.
- 🐺 **[Husky](https://typicode.github.io/husky/)** - Use git hooks with ease to improve your codebase.
- 📝 **[Commitizen](https://github.com/commitizen/cz-cli)** - Standardized commit messages to maintain a clean commit history.
- 🧶 lint-staged - Run linters on pre-committed files in git.
- 🎭 **[Playwright](https://playwright.dev/)** - Write reliable end-to-end tests for your application.
- 🧪 **[Jest](https://jestjs.io/)** and **[React Testing Library](https://testing-library.com/react)** - For rock-solid unit and integration tests.
- 🚀 **[GitHub Actions](https://github.com/features/actions)** - Automate, test and deploy your code seamlessly.
- 🐘 **[PostgreSQL](https://www.postgresql.org/)** - Robust and powerful open-source database system.
- 🌐 **[Supabase](https://supabase.io/)** - Open-source alternative to Firebase, providing instant APIs on top of Postgres.
- 🎣 **[React Hook Form](https://react-hook-form.com/)** - Manage your forms efficiently with React Hooks.
- 🏗️ **Component-based Architecture** - Modular and reusable components for scalable development.
- 🚗 **[Ngrok](https://ngrok.com/)** - Expose your local development server to the internet.
- 📧 **[React Email](https://react.email/)** - Create responsive HTML emails with React components.


## 🎯 Getting Started

To get started with this boilerplate, follow these steps:

1. Fork & clone repository:

```bash
## Don't forget to ⭐ star and fork it first :)
git clone https://github.com/<your_username>/saas.git
```

2. Install the dependencies:

```bash
yarn install --frozen-lockfile
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

Easily deploy your Next.js app with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=github&utm_campaign=next-enterprise) by clicking the button below:

[![Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise)

## 📃 Scripts Overview

The following scripts are available in the `package.json`:

- `dev`: Starts the development server allowing you to work on your project.
- `start:prod`: Starts the production server after building the app.
- `build`: Creates a production build of the application.
- `start`: Runs `yarn run dev` to start the development server.
- `start-ngrok`: Exposes the local server to the internet using ngrok at `template.ngrok.app` domain.
- `start-stripe`: Starts the Stripe CLI and forwards webhook events to your local development server.
- `email:preview`: Starts a development server for previewing emails at the designated port.
- `lint`: Runs ESLint to identify and report on patterns in TypeScript.
- `lint:fix`: Automatically fixes linting issues found by ESLint.
- `prettier-check`: Checks the code for proper formatting with Prettier.
- `prettier-format`: Automatically formats files using Prettier with the project's configuration.
- `test`: Runs the Jest testing suite.
- `coverage`: Executes Jest and generates a coverage report.
- `test:e2e`: Runs end-to-end tests using Playwright.
- `cz`: Initiates Commitizen for standardizing commit messages.

## 🧪 Testing

This boilerplate comes with various testing setups to ensure your application's reliability and robustness.

### Running Tests

- **Unit and integration tests**: Run Jest tests using `yarn test`
- **End-to-end tests (headless mode)**: Run Playwright tests in headless mode with `yarn e2e:headless`
- **End-to-end tests (UI mode)**: Run Playwright tests with UI using `yarn e2e:ui`


### Smoke Testing

In this boilerplate, we use Storybook's out-of-the-box support for smoke testing to verify that components render correctly without any errors. Just run `yarn test-storybook` to perform smoke testing. Remember to write stories in JSX or TSX format only. Smoke testing and a lot of other functionalities dont work well with MDX stories.

## 💾 State Management

While this boilerplate doesn't include a specific state management library, we believe it's essential for you to choose the one that best suits your project's needs. Here are some libraries we recommend for state management:

### Zustand

[Zustand](https://github.com/pmndrs/zustand) is a small, fast, and scalable state management library. It's designed to be simple and intuitive, making it a great choice for small to medium-sized projects. It's also optimized for bundle size, ensuring minimal impact on your app's performance.

Choose the library that best fits your requirements and project structure to ensure an efficient state management solution for your application.

## 🤖 ChatGPT Code Review

We've integrated the innovative [ChatGPT Code Review](https://github.com/anc95/ChatGPT-CodeReview) for AI-powered, automated code reviews. This feature provides real-time feedback on your code, helping improve code quality and catch potential issues.

To use ChatGPT Code Review, add an `OPENAI_API_KEY` environment variable with an appropriate key from the OpenAI platform. For setup details, refer to the [Using GitHub Actions](https://github.com/anc95/ChatGPT-CodeReview#using-github-actions) section in the documentation.

![image](https://user-images.githubusercontent.com/28964599/233685071-e1371edf-6359-41c3-a989-335d6ee09cb7.png)


## 🤝 Contribution

Contributions are always welcome! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes, and commit them using the [Conventional Commits](https://www.conventionalcommits.org/) format.
4. Push your changes to the forked repository.
5. Create a pull request, and we'll review your changes.

## 📜 License

This project is licensed under the MIT License. For more information, see the [LICENSE](./LICENSE) file.
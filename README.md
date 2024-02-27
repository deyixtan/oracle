# oracle

Oracle is a AI chatbot client designed to provide engaging conversational experiences by leveraging cutting-edge AI models.

## Version 1.2.0

## Features

- **Mobile-First**: Beautiful themed UI that adapts seamlessly to various screen sizes.
- **Intelligent Conversation**: Leverages the advanced capabilities of large language models to generate human-like responses.
- **Performance and Responsiveness**: Powered by the Svelte framework for a smooth and snappy chat experience.
- **Personalized Experience**: Remembers user conversations and preferences through `localStorage` and `IndexedDB`.

## Screenshots

<img src="./docs/ss_light.png " alt="light mode" width="300">
<img src="./docs/ss_dark.png " alt="dark mode" width="300">

## Usage

### Project Setup

1. Clone the repository:

```bash
git clone https://github.com/deyixtan/oracle.git && cd oracle
```

2. Install dependencies:

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

### Deployment

1. Prepare for production:

```bash
npm run format
npm run build
npm run preview
```

2. Deploy the contents of the `/build` directory to your preferred hosting platform.

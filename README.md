# oracle

Oracle is a performant and user-friendly AI chatbot client. It's designed to provide engaging conversational experiences by leveraging cutting-edge AI models.

## Version 1.1.0

## Features

- **Mobile-First**: Beautiful themed UI that adapts seamlessly to various screen sizes and dark mode setting.
- **Intelligent Conversation**: Leverages the advanced capabilities of Google's Gemini Pro and Vision AI models for fact-based answers and creative text generation.
- **Performance and Responsiveness**: Powered by the Svelte framework for a smooth and snappy chat experience.
- **Personalized Experience**: Remembers user conversations and preferences through `localStorage` and `IndexedDB`.

## Screenshot

<img src="./docs/ss_light.png " alt="light mode" width="400">
<img src="./docs/ss_dark.png " alt="dark mode" width="400">

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

## Run in Development Mode

```bash
npm run dev
```

## Deployment

1. Prepare for production::

```bash
npm run format
npm run build
npm run preview
```

2. Deploy the contents of the `/build` directory to your preferred hosting platform.

# Sveltekit + Pocketbase OAuth2 Demo
This repo serves as a personal demo for [Pocketbase](https://pocketbase.io/) and [Sveltekit](https://kit.svelte.dev/docs/introduction) using OAuth2 with [Twitch](https://dev.twitch.tv/docs/authentication) as a provider.

## Getting Started
- Download the [latest version of Pocketbase](https://pocketbase.io/docs/) and run the executable
- Register a [Twitch App](https://dev.twitch.tv/console/apps) to acquire a Client ID and Client Secret
- Create an admin account on your local PB server and register your Twitch App as an auth provider

### Env
Create a `.env` file in the root directory of the repo and populate it with the following:
```bash
PUBLIC_TWITCH_REDIRECT_URI="http://localhost:5173/login" # default
PUBLIC_PB_URL="http://127.0.0.1:8090" # default
PUBLIC_TWITCH_CLIENT_ID="..."
TWITCH_CLIENT_SECRET="..."
```

### Developing
Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev
```

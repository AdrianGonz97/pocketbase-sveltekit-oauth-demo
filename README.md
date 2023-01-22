# Sveltekit + Pocketbase OAuth2 Demo
This repo serves as a personal demo for [Pocketbase](https://pocketbase.io/) and [Sveltekit](https://kit.svelte.dev/docs/introduction) using OAuth2 with **any** supported provider.

Designed to be as plug and play as possible. All you need to do is add the provider in the admin dashboard and you're ready to go! No further customization is necessary.

## Getting Started
- Download the [latest version of Pocketbase](https://pocketbase.io/docs/) and run the executable with `./pocketbase serve`
- Register an app with your OAuth provider to acquire a Client ID and Client Secret (for instance, you can create a [Twitch App here](https://dev.twitch.tv/console/apps)). From here, you should be able to set the **Redirect URL** (if applicable) of your OAuth App to `http://localhost:5173/login`
- Create an admin account on your local PB server and register your app as an OAuth provider (which can be accessed [here](http://127.0.0.1:8090/_/?#/settings/auth-providers) if you're working locally with the default PB host settings)

### Env
Create a `.env` file in the root directory of the repo and populate it with the following:
```bash
PUBLIC_REDIRECT_URI="http://localhost:5173/login" # default
PUBLIC_PB_URL="http://127.0.0.1:8090" # default
```

### Developing
Once you've installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev
```

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		pb: import('pocketbase').default;
		user?: import('pocketbase').Record | import('pocketbase').Admin;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

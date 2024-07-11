// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare namespace App {
	interface Locals {
	  user: {
		name: string
		role: string
	  }
	}
}

export {};

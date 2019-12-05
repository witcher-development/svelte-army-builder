import { writable } from "svelte/store";

const initAuthState = localStorage.getItem('app.auth');

const authStore = writable(initAuthState ? initAuthState : false);

export { authStore };

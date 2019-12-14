import { get, writable } from 'svelte/store';

type Loading = boolean;
export const state = writable<Loading>(false);
export const getState = (): Loading => get(state);
export const setLoading = (value: Loading) => state.set(value);

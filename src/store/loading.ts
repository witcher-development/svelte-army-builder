import { get, writable } from 'svelte/store';

import { Loading } from "../types/client";

export const state = writable<Loading>(false);
export const getState = (): Loading => get(state);
export const setLoading = (value: Loading) => state.set(value);

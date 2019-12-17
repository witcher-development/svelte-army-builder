import { get, writable } from 'svelte/store';

import { Navigation } from '../types/client';

const initState: Navigation = {
	total: 0,
	current: 0,
};

export const state = writable(initState);
export const getState = () => get(state);
export const setState = (navigation: Navigation) => state.set(navigation);

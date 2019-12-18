import { get, writable } from 'svelte/store';

import { Pagination } from '../types/client';

const initState: Pagination = {
	total: 1,
	current: 1,
};

export const state = writable(initState);
export const getState = () => get(state);
export const setState = (navigation: Pagination) => state.set(navigation);
export const setTotal = (total: number) => state.set({ ...getState(), total });
export const setCurrent = (current: number) => state.set({ ...getState(), current });

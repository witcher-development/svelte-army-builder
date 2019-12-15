import { get, writable } from 'svelte/store';

import { Filter } from '../types/client';

const initFilterState: Filter[] = [
	{
		name: 'attack',
		options: [...Array(12)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		})),
	},
	{
		name: 'mana',
		options: [...Array(10)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		})),
	},
	{
		name: 'health',
		options: [...Array(10)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		}))
	},
];

export const state = writable(initFilterState);
export const getState = (): Filter[] => get(state);

import { get, writable } from 'svelte/store';

import { Filter, Option } from '../types/client';

type Filters = { [k: string]: Filter };
const initFilterState: Filters = {
	health: {
		name: 'health',
		options: [...Array(10)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		})),
		current: {
			label: '2',
			value: 2,
		},
		color: '#f5000c',
	},
	attack: {
		name: 'attack',
		options: [...Array(12)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		})),
		current: {
			label: '2',
			value: 2,
		},
		color: '#fce100',
	},
	mana: {
		name: 'mana',
		options: [...Array(10)].map((_, i) => ({
			label: '' + (i + 1),
			value: i + 1,
		})),
		current: {
			label: '2',
			value: 2,
		},
		color: '#4a4dad',
	},
	rarity: {
		name: 'rarity',
		options: [
			{
				value: 'common',
				label: 'Common',
			},
			{
				value: 'free',
				label: 'Free',
			},
			{
				value: 'rare',
				label: 'Rare',
			},
			{
				value: 'epic',
				label: 'Epic',
			},
			{
				value: 'legendary',
				label: 'Legendary',
			},
		],
		current: {
			value: 'common',
			label: 'Common',
		},
		color: '#fff',
	},
};

export const state = writable(initFilterState);
export const getState = (): Filter[] => Object.values(get(state));
export const setFiled = (field: string, option: Option) => {
	state.update((store) => {
		store[field].current = option;
		return store;
	});
};
export const clearFields = () => {
	state.update((store) => {
		Object.keys(store).forEach((field) => {
			store[field].current = null;
		});
		return store;
	});
};

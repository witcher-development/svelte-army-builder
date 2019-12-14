import { writable } from 'svelte/store';

import { getPlayerInitState } from '../initStates';
import { Player } from '../types';

export const state = writable(getPlayerInitState());
export const setPlayer = (player: Player) => {
	state.set(player);
};

import { writable } from 'svelte/store';

import { Player } from '../types/client';

const playerInitState: Player = {
	id: 0,
	characterId: 0,
	classId: 0,
};

export const state = writable(playerInitState);
export const setPlayer = (player: Player) => {
	state.set(player);
};

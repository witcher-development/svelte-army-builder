import { get, writable } from 'svelte/store';

import { Player, Token } from '../types/client';
import { Response } from '../types/server';

import { getPlayer } from '../server';
import { getState as getToken, logout } from './auth';

const playerInitState: Player = {
	id: 0,
	characterId: 0,
	classId: 0,
};

export const state = writable(playerInitState);
export const getState = (): Player => get(state);
export const setPlayer = (player: Player) => state.set(player);
export const resetPlayer = () => state.set(playerInitState);

export const fetchPlayer = async (): Promise<Player | undefined> => {
	const token: Token = getToken();
	const response: Response<Player | null> = await getPlayer(token);

	const { data: player, message } = response;

	if (!player) {
		alert(message);
		logout();
		return;
	}

	setPlayer(player);

	return player;
};

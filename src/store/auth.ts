import { get, writable } from 'svelte/store';

import { Token } from '../types/client';
import { Response } from '../types/server';

import { auth, createPlayer } from '../server';

const tokenInitState: Token = {
	playerId: 0,
	token: false,
	expiredDate: null,
};
const token: Token = JSON.parse(localStorage.getItem('app.token') || 'null');
export const state = writable(token || tokenInitState);

export const getState = (): Token => get(state);

export const login = async (characterId: number): Promise<boolean> => {
	const response: Response<Token> = await auth(characterId);

	if (!response.status) {
		const newPlayerResponse: Response<Player> = await createPlayer(characterId);
		player = newPlayerResponse.data;
	} else if (response.data !== null) {
		player = response.data;
	}

	// setPlayer(player);

	return true;
};

export const logout = () => {
	localStorage.setItem('app.player', '');
};

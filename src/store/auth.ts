import { get, writable } from 'svelte/store';

import { Response, Token } from '../types';
import { auth, createPlayer } from '../server';

const initAuthState: Token = {
	playerId: 0,
	token: false,
};
const tokenFromStorage: Token = JSON.parse(localStorage.getItem('app.token') || 'null');
export const state = writable(tokenFromStorage || initAuthState);

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

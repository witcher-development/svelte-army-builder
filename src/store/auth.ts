import { get, writable } from 'svelte/store';

import { Token } from '../types/client';
import { Response } from '../types/server';

import { auth } from '../server';

const tokenInitState: Token = {
	playerId: 0,
	token: false,
	expiredDate: null,
};
const token: Token = JSON.parse(localStorage.getItem('app.token') || 'null');

export const state = writable(token || tokenInitState);
export const getState = (): Token => get(state);
export const setToken = (token: Token) => {
	localStorage.setItem('app.token', JSON.stringify(token));
	state.set(token);
};

export const login = async (characterId: number): Promise<Token> => {
	const response: Response<Token> = await auth(characterId);
	const { data: token } = response;

	setToken(token);
	return token;
};

export const logout = () => {
	localStorage.setItem('app.token', '');
	setToken(tokenInitState);
};

import { Token } from '../types/server';

import { getPlayerById } from './playerService';

export const createUserToken = (playerId: number): Token => {
	const expiredDateObject = new Date();
	expiredDateObject.setDate(expiredDateObject.getDate() + 1);
	const expiredDateString = expiredDateObject.toISOString();

	return {
		playerId,
		token: true,
		expiredDate: expiredDateString,
	};
};
export const verifyUserToken = (token: Token): boolean => {
	if (!token.expiredDate) return false;

	const now = new Date().toISOString();
	const fresh = now < token.expiredDate;

	const player = getPlayerById(token.playerId);
	const exists = !!player;

	const rightToken = token.token;

	return fresh && exists && rightToken;
};

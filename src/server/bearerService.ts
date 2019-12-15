import { Token } from '../types/server';

import { getPlayerById } from './playerService';

export const createUserToken = (playerId: number): Token => {
	const today = new Date();
	const expiredDate = new Date(today);
	expiredDate.setDate(expiredDate.getDate() + 1);

	return {
		playerId,
		token: true,
		expiredDate,
	};
};
export const verifyUserToken = (token: Token): boolean => {
	if (!token.expiredDate) return false;

	const now = new Date();
	const fresh = now < token.expiredDate;

	const player = getPlayerById(token.playerId);
	const exists = !!player;

	const rightToken = token.token;

	return fresh && exists && rightToken;
};

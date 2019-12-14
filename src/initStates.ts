import { Player, Deck } from './types';

export const getPlayerInitState = (): Player => ({
	id: 0,
	characterId: 0,
	classId: 0,
});

export const getDeckInitState = (): Deck => [...Array(4)].map(() => null);

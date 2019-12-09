import { Player } from './types';

export const getPlayerInitState = (): Player => {
	return {
		id: 0,
		characterId: 0,
		token: false,
		classId: 0,
		deck: [],
	}
};

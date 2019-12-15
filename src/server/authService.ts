import { Response, Token, Player } from '../types/server';

import { createResponse } from './helpers';
import { getPlayerByCharacterId, createPlayer } from './playerService';
import { createUserToken } from './bearerService';

export const auth = async (characterId: number): Promise<Response<Token>> => {
	const player: Player | undefined = await getPlayerByCharacterId(characterId);

	if (!player) {
		const newPlayer = await createPlayer(characterId);
		const token = await createUserToken(newPlayer.id);
		return createResponse<Token>(token, 'new player');
	}

	const token = await createUserToken(player.id);
	return createResponse<Token>(token);
};

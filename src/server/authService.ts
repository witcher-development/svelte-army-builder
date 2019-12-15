import { Response, Token } from '../types/server';

export const auth = async (characterId: number): Promise<Response<Token | null>> => {
	const playersDB: PlayerFromStorage[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');

	const player: PlayerFromStorage | undefined = playersDB.find(
		(DBPlayer) => DBPlayer.characterId === characterId,
	);

	if (!player) return createResponse<null>(null, 'not found');

	return createResponse<PlayerFromStorage>(player);
};

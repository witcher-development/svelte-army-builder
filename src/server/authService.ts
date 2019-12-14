import {Response} from "../types";

export const auth = async (
	characterId: number,
): Promise<Response<Token>> => {
	const playersDB: PlayerFromStorage[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');

	const player: PlayerFromStorage | undefined = playersDB.find(
		(DBPlayer) => DBPlayer.characterId === characterId,
	);

	if (!player) return createResponse<null>(null, 'not found');

	player.characterId = characterId;
	player.classId = getCharacterClass(characterId);

	return createResponse<PlayerFromStorage>(player);
};

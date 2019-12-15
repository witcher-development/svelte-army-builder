import { Player, Response, Token } from '../types/server';

import { akaDBRequest, createResponse } from './helpers';
import { verifyUserToken } from './bearerService';
import { getCharacterClass } from './staticService';

const playerInitState: Player = {
	id: 0,
	characterId: 0,
	classId: 0,
};

const getPlayers = async (): Promise<Player[]> => {
	return await akaDBRequest((resolve) => {
		resolve(JSON.parse(localStorage.getItem('app.players') || '[]'));
	});
};
export const getPlayer = async (
	token: Token,
): Promise<Response<Player | null>> => {
	if (!(await verifyUserToken(token)))
		return createResponse<null>(null, 'wrong token');

	const playersDB: Player[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');

	const player = playersDB.find(({ id }) => id === token.playerId);

	if (!player) return createResponse<null>(null, 'not found');

	return createResponse<Player>(player);
};
export const getPlayerById = async (
	id: number,
): Promise<Player | undefined> => {
	const playersDB: Player[] = await getPlayers();

	return playersDB.find((player) => id === player.id);
};
export const getPlayerByCharacterId = async (
	characterId: number,
): Promise<Player | undefined> => {
	const playersDB: Player[] = await getPlayers();

	return playersDB.find((player) => characterId === player.characterId);
};

const setPlayers = async (players: Player[]) => {
	await akaDBRequest(async (res) => {
		localStorage.setItem('app.players', JSON.stringify(players));
		res();
	});
};
const setPlayerById = async (player: Player) => {
	const players = await getPlayers();
	const index = players.findIndex(({ id }) => player.id === id);
	if (index !== -1) {
		players[index] = player;
		setPlayers(players);
	}
};

export const createPlayer = async (characterId: number): Promise<Player> => {
	const playersDB: Player[] = await getPlayers();

	const player: Player = Object.assign({}, playerInitState, {
		id: await getFreeId(),
		characterId,
		classId: getCharacterClass(characterId),
	});

	setPlayers([...playersDB, player]);

	return player;
};

const getFreeId = async (): Promise<number> => {
	const playersDB = await getPlayers();
	return playersDB.length ? playersDB[playersDB.length - 1].id + 1 : 1;
};

import { getPlayerInitState } from './initStates';
import {Response} from "../types";

const getPlayers = async (): Promise<PlayerFromStorage[]> => {
	return await akaDBRequest((resolve) => {
		resolve(JSON.parse(localStorage.getItem('app.players') || '[]'));
	});
};
const getPlayerById = async (
	id: number,
): Promise<PlayerFromStorage | undefined> => {
	const playersDB: PlayerFromStorage[] = await getPlayers();

	return playersDB.find((player) => id === player.id);
};

const setPlayers = async (players: PlayerFromStorage[]) => {
	await akaDBRequest(async (res) => {
		localStorage.setItem('app.players', JSON.stringify(players));
		res();
	});
};
const setPlayerById = async (player: PlayerFromStorage) => {
	const players = await getPlayers();
	const index = players.findIndex(({ id }) => player.id === id);
	if (index !== -1) {
		players[index] = player;
		setPlayers(players);
	}
};

export const getPlayer = async (token) => {
	const playersDB: PlayerFromStorage[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');
};
export const createPlayer = async (
	characterId: number,
): Promise<Response<PlayerFromStorage>> => {
	const playersDB: PlayerFromStorage[] = await getPlayers();

	const playerTemplate: PlayerFromStorage = getPlayerInitState();
	const player: PlayerFromStorage = Object.assign({}, playerTemplate, {
		id: await getFreeId(),
		characterId,
		classId: getCharacterClass(characterId),
	});

	setPlayers([...playersDB, player]);

	player.token = createUserToken();
	return createResponse<PlayerFromStorage>(player);
};

const getFreeId = async (): Promise<number> => {
	const playersDB = await getPlayers();
	return playersDB.length ? playersDB[playersDB.length - 1].id + 1 : 1;
};

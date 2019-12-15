import {Player, Response} from "../types/server";

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
const getPlayerById = async (
	id: number,
): Promise<Player | undefined> => {
	const playersDB: Player[] = await getPlayers();

	return playersDB.find((player) => id === player.id);
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

export const getPlayer = async (token) => {
	const playersDB: Player[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');
};
export const createPlayer = async (
	characterId: number,
): Promise<Response<Player>> => {
	const playersDB: Player[] = await getPlayers();

	const playerTemplate: Player = Object.assign({}, playerInitState);
	const player: Player = Object.assign({}, playerTemplate, {
		id: await getFreeId(),
		characterId,
		classId: getCharacterClass(characterId),
	});

	setPlayers([...playersDB, player]);

	return createResponse<Player>(player);
};

const getFreeId = async (): Promise<number> => {
	const playersDB = await getPlayers();
	return playersDB.length ? playersDB[playersDB.length - 1].id + 1 : 1;
};

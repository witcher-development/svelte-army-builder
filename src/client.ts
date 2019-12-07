import axois from 'axios';
import { Player, Response, Token } from './types';
import authData from '../api_key.json';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/data/hearthstone/';
let token = '';

const client = axois.create({
	baseURL,
});

client.interceptors.request.use(async (config) => {
	if (!token) {
		await getAccessToken();
	}

	const params = {
		region: 'eu',
		namespace: 'static-eu',
		locale: 'en_US',
		access_token: token,
	};

	config.params = config.params || params;

	return config;
});

export const getAccessToken = async () => {
	const data = await axois.get(authUrl);
	token = data.data.access_token;
};

const createUserToken = (): Token => {
	return true;
};
const verifyUserToken = (token: Token): boolean => {
	return token;
};

const createResponse = <T>(data: T, message?: string): Response<T> => ({
	data,
	status: !message,
	message,
});

const akaDBRequest = (payload): Promise<any> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			payload(resolve, reject);
		}, 1000);
	});
};

const getPlayers = async (): Promise<Player[]> => {
	return await akaDBRequest((resolve) => {
		resolve(JSON.parse(localStorage.getItem('app.players') || '[]'));
	});
};

export const getFreeId = async (): Promise<number> => {
	const playersDB = await getPlayers();
	return playersDB[playersDB.length - 1].id + 1;
};

export const auth = async (characterId: number): Promise<Response<Player | null>> => {
	const playersDB: Player[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');

	const player = playersDB.find((player) => player.characterId === characterId);

	if (!player) return createResponse<null>(null, 'not found');

	player.token = createUserToken();
	return createResponse<Player>(player);
};

export const createPlayer = async (player: Player): Promise<Response<Player | null>> => {
	const playersDB: Player[] = await getPlayers();

	if (playersDB.find(({ id }) => id === player.id))
		return createResponse<null>(null, 'already exist');

	localStorage.setItem('app.players', JSON.stringify([...playersDB, player]));

	player.token = createUserToken();
	return createResponse<Player>(player);
};

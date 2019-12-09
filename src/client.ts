import axois from 'axios';
import { Player, Response, Token, Card, CardResponse } from './types';
import { getPlayerInitState } from './initStates';
import authData from '../api_key.json';

const authUrl = `https://eu.battle.net/oauth/token?client_id=${authData.id}&client_secret=${authData.secret}&grant_type=client_credentials`;
const baseURL = 'https://eu.api.blizzard.com/hearthstone/';
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
const getPlayerById = async (id: number): Promise<Player | undefined> => {
	const playersDB: Player[] = await getPlayers();

	return playersDB.find((player) => id === player.id);
};

export const getFreeId = async (): Promise<number> => {
	const playersDB = await getPlayers();
	return playersDB.length ? playersDB[playersDB.length - 1].id + 1 : 1;
};

const getCharacterClass = (characterId: number): number => {
	if (characterId === 1) {
		return 4;
	} else if (characterId === 2) {
		return 2;
	} else if (characterId === 3) {
		return 3;
	}
	return 0;
};

export const auth = async (
	characterId: number,
): Promise<Response<Player | null>> => {
	const playersDB: Player[] = await getPlayers();

	if (!playersDB.length) return createResponse<null>(null, 'db is empty');

	const player = playersDB.find((player) => player.characterId === characterId);

	if (!player) return createResponse<null>(null, 'not found');

	player.token = createUserToken();
	player.characterId = characterId;
	player.classId = getCharacterClass(characterId);
	return createResponse<Player>(player);
};

export const createPlayer = async (
	characterId: number,
): Promise<Response<Player>> => {
	const playersDB = await getPlayers();

	const playerTemplate: Player = getPlayerInitState();
	const player: Player = Object.assign(playerTemplate, {
		id: await getFreeId(),
		characterId,
		classId: getCharacterClass(characterId),
	});

	localStorage.setItem('app.players', JSON.stringify([...playersDB, player]));

	player.token = createUserToken();
	return createResponse<Player>(player);
};

export const getCards = async (): Promise<Response<CardResponse>> => {
	const url = '/cards?page=2&pageSize=9&type=minion&class=hunter';
	const response = await client(url);

	const cards: Card[] = response.data.cards
		.filter(({ image }) => image)
		.map(
			({
				id,
				name,
				health,
				attack,
				manaCost,
				image,
				text,
				flavorText,
				rarityId,
				classId,
			}) => ({
				id,
				name,
				health,
				attack,
				manaCost,
				image,
				text,
				flavorText,
				rarityId,
				classId,
			}),
		);

	return createResponse<CardResponse>({
		...response.data,
		cards,
	});
};

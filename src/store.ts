import { readable, writable, derived, get } from 'svelte/store';
import { auth, getFreeId, createPlayer } from './client';
import { Player, Response, Token, Card } from './types';
import { getPlayerInitState } from './initStates';

// @ts-ignore
import Jaina from 'assets/players/Jaina.png';
// @ts-ignore
import Malfurion from 'assets/players/Malfurion.png';
// @ts-ignore
import Rexxar from 'assets/players/Rexxar.png';

interface Character {
	id: number;
	name: string;
	image: string;
}
const initCharactersState: Character[] = [
	{
		id: 1,
		name: 'Jaina',
		image: Jaina,
	},
	{
		id: 2,
		name: 'Malfurion',
		image: Malfurion,
	},
	{
		id: 3,
		name: 'Rexxar',
		image: Rexxar,
	},
];
const charactersStore = readable(initCharactersState, () => {});

const classesInitState = [
	{
		id: 2,
		name: 'Druid',
	},
	{
		id: 3,
		name: 'Hunter',
	},
	{
		id: 4,
		name: 'Mage',
	},
	{
		id: 5,
		name: 'Paladin',
	},
	{
		id: 6,
		name: 'Priest',
	},
	{
		id: 7,
		name: 'Rogue',
	},
	{
		id: 8,
		name: 'Shaman',
	},
	{
		id: 9,
		name: 'Warlock',
	},
	{
		id: 10,
		name: 'Warrior',
	},
	{
		id: 12,
		name: 'Neutral',
	},
];
const classesStore = readable(classesInitState, () => {});

export const getClassNameById = (classId: number): string => {
	const classObject = get(classesStore).find(({ id }) => id === classId);
	return classObject ? classObject.name : 'All classes';
};

const playerFromStorage = JSON.parse(
	localStorage.getItem('app.player') || 'null',
);
const playerStore = writable(playerFromStorage || getPlayerInitState());

interface Auth {
	token: Token;
}
const initAuthState: Auth = {
	token: false,
};
const authStore = derived(playerStore, (player) => {
	if (player) {
		return {
			token: player.token,
		};
	} else {
		return initAuthState;
	}
});

const login = async (characterId: number): Promise<boolean> => {
	const response: Response<Player | null> = await auth(characterId);

	let player = response.data;

	if (!response.status) {
		player = (await createPlayer(characterId)).data;
	}

	localStorage.setItem('app.player', JSON.stringify(player));
	playerStore.set(player);

	return true;
};

const logout = () => {
	playerStore.set(getPlayerInitState());
	localStorage.setItem('app.player', '');
};

const loadingStore = writable(false);
const setLoading = (value: boolean) => loadingStore.set(value);

const cardsInitState: Card[] = [];
const cardsStore = writable(cardsInitState);
const setCards = (cards: Card[]) => {
	cardsStore.set(cards);
};

export {
	loadingStore,
	authStore,
	charactersStore,
	classesStore,
	playerStore,
	login,
	logout,
	setLoading,
	cardsStore,
	setCards,
};

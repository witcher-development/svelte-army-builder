import { writable } from 'svelte/store';
import {} from './client';

// @ts-ignore
import Jaina from 'assets/players/Jaina.png';
// @ts-ignore
import Malfurion from 'assets/players/Malfurion.png';
// @ts-ignore
import Rexxar from 'assets/players/Rexxar.png';

interface Auth {
	playerId: number,
	auth: boolean,
}
const initAuthState: Auth = {
	playerId: 0,
	auth: false,
};
const authFromStorage = localStorage.getItem('app.auth');
const authStore = writable(authFromStorage ? JSON.parse(authFromStorage) : initAuthState);

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
const charactersStore = writable(initCharactersState);

interface Card {
	id: number;
	name: string;
	health: number;
	attack: number;
	image: string;
	text: string;
	rarity: number;
}

interface Player {
	id: number,
	characterId: number;
	auth: boolean;
	deck: Card[];
}
const playerInitState: Player = {
	id: 0,
	characterId: 0,
	auth: false,
	deck: [],
};
const playerStore = writable(playerInitState);
const selectPlayer = (id) => {};

export { authStore, charactersStore, playerStore };

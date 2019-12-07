import { readable, writable, derived, get } from 'svelte/store';
import { auth, getFreeId, createPlayer } from './client';
import { Player, Response, Token } from './types';

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

const playerInitState: Player = {
	id: 0,
	characterId: 0,
	token: false,
	deck: [],
};
const playerFromStorage = JSON.parse(localStorage.getItem('app.player') || '');
const playerStore = writable(playerFromStorage || playerInitState);

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

	let player = get(playerStore);

	if (!response.status) {
		if (response.message === 'db is empty') {
			player.id = 1;
		}
		if (response.message === 'not found') {
			player.id = await getFreeId();
		}
	}

	player.characterId = characterId;

	const playerResponse = await createPlayer(player);
	player = playerResponse.data;

	localStorage.setItem('app.player', JSON.stringify(player));

	return true;
};

const loadingStore = writable(false);

export { loadingStore, authStore, charactersStore, playerStore, login };

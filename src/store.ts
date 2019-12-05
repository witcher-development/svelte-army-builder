import { writable } from "svelte/store";

// @ts-ignore
import Jaina from 'assets/players/Jaina.png';
// @ts-ignore
import Malfurion from 'assets/players/Malfurion.png';
// @ts-ignore
import Rexxar from 'assets/players/Rexxar.png';

const initAuthState = localStorage.getItem('app.auth');
const authStore = writable(initAuthState ? initAuthState : false);

const initPlayersState = [
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
	}
];
const playerStore = writable(initPlayersState);

export { authStore, playerStore };

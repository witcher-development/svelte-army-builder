import { readable, writable, derived, get } from 'svelte/store';
import { auth, getFreeId, createPlayer } from './client';
import { Player, Response, Token, Card, Deck } from './types';
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

const getCharacterNameById = (characterId: number): string => {
	const characterObject = get(charactersStore).find(
		({ id }) => id === characterId,
	);
	return characterObject ? characterObject.name : '';
};

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

const getClassNameById = (classId: number): string => {
	const classObject = get(classesStore).find(({ id }) => id === classId);
	return classObject ? classObject.name : 'All classes';
};

const playerFromStorage = JSON.parse(
	localStorage.getItem('app.player') || 'null',
);
const playerStore = writable(playerFromStorage || getPlayerInitState());
const setCard = (index: number, card: Card) => {
	playerStore.update((store) => {
		const deck: Deck = [...store.deck];

		const isAlreadyExistsIndex = deck.findIndex(
			(deckCard) => deckCard && deckCard.id === card.id,
		);

		if (deck[index] && isAlreadyExistsIndex !== -1) {
			deck[isAlreadyExistsIndex] = deck[index];
		} else if (isAlreadyExistsIndex !== -1) {
			deck[isAlreadyExistsIndex] = null;
		}

		deck[index] = card;

		return {
			...store,
			deck,
		};
	});
};
const removeCard = (id: number) => {
	playerStore.update((store) => {
		const deck: Deck = [...store.deck];
		const index = deck.findIndex((card) => card && card.id === id);

		deck[index] = null;

		return {
			...store,
			deck,
		};
	});
};

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
const getCardImageById = (cardId: number): string | void => {
	const card: Card = get(cardsStore).find(({ id }) => cardId === id);

	if (card) return card.image;

	alert('Card not found');
};

interface Drag {
	isDragOn: boolean;
	cardId: number;
	dragFromDeck: boolean;
}
const dragInitState: Drag = {
	isDragOn: false,
	cardId: 0,
	dragFromDeck: false,
};
const dragStore = writable(dragInitState);
const setDrag = (partOfDrag: Partial<Drag>) => {
	dragStore.update((drag) => ({ ...drag, ...partOfDrag }));
};
const resetDrag = () => {
	dragStore.set(dragInitState);
};

interface DragNodeCoors {
	x: number;
	y: number;
}
const dragNodeInitCoors: DragNodeCoors = {
	x: -100,
	y: -100,
};
const dragNodeCoorsStore = writable(dragNodeInitCoors);
const setDragNodeCoors = (coors: DragNodeCoors) => {
	dragNodeCoorsStore.set(coors);
};
const resetDragNodeCoors = () => {
	dragNodeCoorsStore.set(dragNodeInitCoors);
};

export {
	loadingStore,
	authStore,
	charactersStore,
	getCharacterNameById,
	classesStore,
	getClassNameById,
	playerStore,
	setCard,
	removeCard,
	login,
	logout,
	setLoading,
	cardsStore,
	setCards,
	getCardImageById,
	dragStore,
	setDrag,
	resetDrag,
	dragNodeCoorsStore,
	setDragNodeCoors,
	resetDragNodeCoors,
};

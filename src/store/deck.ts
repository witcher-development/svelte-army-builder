import { get, writable } from 'svelte/store';

import { Card, Deck, Token } from '../types/client';
import { Deck as ServerDeck } from '../types/server';
import { setDeck as saveDeck, getDeck } from '../server';
import { getState as getToken } from './auth';

const cardsInDeck = 4;
const deckInitState: Deck = [...Array(cardsInDeck)].map(() => null);
export const state = writable<Deck>(deckInitState);

export const getState = (): Deck => get(state);

export const setDeck = (deck: Deck) => {
	state.set(deck);
};

export const setCard = (index: number, card: Card) => {
	const deck: Deck = [...get(state)];

	const isAlreadyExistsIndex = deck.findIndex(
		(deckCard) => deckCard && deckCard.id === card.id,
	);

	if (deck[index] && isAlreadyExistsIndex !== -1) {
		deck[isAlreadyExistsIndex] = deck[index];
	} else if (isAlreadyExistsIndex !== -1) {
		deck[isAlreadyExistsIndex] = null;
	}

	deck[index] = card;

	updateDeck(deck);
};

export const removeCard = (id: number) => {
	const deck: Deck = [...get(state)];
	const index = deck.findIndex((card) => card && card.id === id);

	deck[index] = null;

	updateDeck(deck);
};

export const updateDeck = (deck: Deck) => {
	state.set(deck);

	const token = getToken();

	saveDeck(token, convertDeckForSave(deck));
};

export const fetchDeck = async (): Promise<Deck | undefined> => {
	const token: Token = getToken();
	const response = await getDeck(token);

	const { data: deck, message } = response;

	if (!deck) {
		alert(message);
		return;
	}

	setDeck(deck);
	return deck;
};

const convertDeckForSave = (deck: Deck) =>
	deck.map((card) => (card ? card.id : null));

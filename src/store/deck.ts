import { get, writable } from 'svelte/store';

import { Card, Deck } from '../types/client';
import { Deck as ServerDeck } from '../types/server';
import { setDeck as saveDeck } from '../server';

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

	const player = get(state);

	saveDeck(player.id, player.token, convertDeckForSave(deck));
};

const convertDeckForSave = (deck: Deck): ServerDeck =>
	deck.map((card) => (card ? card.id : null));

import { get, writable } from 'svelte/store';

import { Card, Deck, DeckForStorage } from '../types';
import { setDeck as saveDeck } from '../server';
import { getDeckInitState } from "../initStates";

export const state = writable<Deck>(getDeckInitState());

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

	saveDeck(player.id, player.token, convertDeckForStorage(deck));
};

const convertDeckForStorage = (deck: Deck): DeckForStorage =>
	deck.map((card) => (card ? card.id : null));

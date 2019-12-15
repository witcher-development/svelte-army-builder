import { get, writable } from 'svelte/store';

import { Card } from '../types/client';

const cardsInitState: Card[] = [];
export const state = writable(cardsInitState);

export const getState = (): Card[] => get(state);

export const setCards = (cards: Card[]) => {
	state.set(cards);
};

export const getCardImageById = (cardId: number): string | void => {
	const card: Card = get(state).find(({ id }) => cardId === id);

	if (card) return card.image;

	alert('Card not found');
};

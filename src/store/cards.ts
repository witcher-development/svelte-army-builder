import { get, writable } from 'svelte/store';

import { Card } from '../types/client';
import { Response, CardResponse } from '../types/server';

import { getCards } from '../server';

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

export const fetchCards = async (): Promise<Card[]> => {
	const response: Response<CardResponse> = await getCards();

	const { cards } = response.data;

	setCards(cards);
	return cards;
};

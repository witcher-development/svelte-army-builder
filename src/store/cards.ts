import { get, writable } from 'svelte/store';

import { Card, Filter } from '../types/client';
import { Response, CardResponse } from '../types/server';

import { getState as getFilters } from './filter';
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
	const filters: Filter[] = getFilters();
	const params: { [k: string]: string | number } = {};

	filters.forEach(({ name, current }) => {
		if (!current) return;
		if (name === 'mana') {
			params['manaCost'] = current.value;
		} else {
			params[name] = current.value;
		}
	});

	const response: Response<CardResponse> = await getCards(params);

	const { cards } = response.data;

	console.log(response.data);

	setCards(cards);
	return cards;
};

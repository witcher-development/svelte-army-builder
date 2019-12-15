import { Card, CardResponse, Deck, Response, Token } from '../types/server';
import { Deck as ClientDeck } from '../types/client';

import { createResponse, akaDBRequest } from './helpers';
import { client } from './api';
import { verifyUserToken } from './bearerService';

export const getCards = async (): Promise<Response<CardResponse>> => {
	const url = '/cards?page=2&pageSize=9&type=minion&class=hunter';
	const response = await client(url);

	const cards: Card[] = response.data.cards
		.filter(({ image }) => image)
		.map(
			({
				id,
				name,
				health,
				attack,
				manaCost,
				image,
				text,
				flavorText,
				rarityId,
				classId,
			}) => ({
				id,
				name,
				health,
				attack,
				manaCost,
				image,
				text,
				flavorText,
				rarityId,
				classId,
			}),
		);

	return createResponse<CardResponse>({
		...response.data,
		cards,
	});
};

const cardsInDeck = 4;
const deckInitState: Deck = {
	playerId: 0,
	deck: [...Array(cardsInDeck)].map(() => null),
};

const getDecks = async (): Promise<Deck[]> => {
	return await akaDBRequest<Deck[]>((res) => {
		const deckDB: Deck[] | null = JSON.parse(
			localStorage.getItem('app.decks') || 'null',
		);
		if (!deckDB) {
			localStorage.setItem('app.decks', '[]');
			res([]);
			return;
		}
		res(deckDB);
	});
};

export const getDeck = async (
	token: Token,
): Promise<Response<ClientDeck | null>> => {
	if (!(await verifyUserToken(token)))
		return createResponse<null>(null, 'wrong token');

	const decks = await getDecks();

	const playerDeck = decks.find(({ playerId }) => playerId === token.playerId);

	let ids: Array<number | null>;
	if (!playerDeck) {
		const newDeck = [...deckInitState.deck];

		setDeck(token, newDeck);
		ids = newDeck;
	} else {
		ids = playerDeck.deck;
	}

	const url = '/cards/';
	const deck: Array<Card | null> = [];

	for (const id of ids) {
		if (id) {
			const card = await client(url + id);
			console.log(card);
			deck.push(null);
		} else {
			deck.push(null);
		}
	}

	return createResponse<ClientDeck>(deck);
};

export const setDeck = async (token: Token, ids: Array<number | null>) => {
	if (!(await verifyUserToken(token))) return;

	const decks = await getDecks();

	const deck = decks.find(({ playerId }) => playerId === token.playerId);

	if (!deck) {
		const newDeck = Object.assign({}, deckInitState);
		newDeck.deck = ids;

		localStorage.setItem('app.decks', JSON.stringify([...decks, newDeck]));
		return;
	}

	deck.deck = ids;
	localStorage.setItem('app.decks', JSON.stringify([...decks, deck]));
};

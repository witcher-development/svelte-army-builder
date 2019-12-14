import {Card, CardResponse, Deck, DeckForStorage, Response} from "../types";

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

export const getDeck = async (
	token: Token,
	ids: DeckForStorage,
): Promise<Response<Deck | null>> => {
	if (!(await verifyUserToken(token)))
		return createResponse<null>(null, 'wrong token');

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

	return createResponse<Deck>(deck);
};

export const setDeck = async (
	playerId: number,
	token: Token,
	ids: DeckForStorage,
) => {
	if (!(await verifyUserToken(token))) return;

	const player = await getPlayerById(playerId);

	if (!player) return;

	setPlayerById({
		...player,
		deck: ids,
	});
};

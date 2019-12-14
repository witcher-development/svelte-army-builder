export interface Card {
	id: number;
	name?: string;
	health?: number;
	attack?: number;
	manaCost?: number;
	image?: string;
	text?: string;
	flavorText?: string;
	rarityId?: number;
	classId?: number;
}

export interface CardResponse {
	cardCount: number;
	cards: Card[];
	page: number;
	pageCount: number;
}

export type Deck = Array<Card | null>;
export type DeckForStorage = Array<number | null>;

export interface Player {
	id: number;
	characterId: number;
	classId: number;
}

export interface Response<T> {
	status: boolean;
	message?: string;
	data: T;
}

export interface Token {
	playerId: number;
	token: boolean;
}

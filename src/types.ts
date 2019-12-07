export interface Card {
	id: number;
	name: string;
	health: number;
	attack: number;
	image: string;
	text: string;
	rarity: number;
}

export interface Player {
	id: number,
	characterId: number;
	token: Token;
	deck: Card[];
}

export interface Response<T> {
	status: boolean,
	message?: string,
	data: T,
}

export type Token = boolean;

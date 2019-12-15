import { BToken, BPlayer, BCard, BCharacter, BGameClass } from './base';

export interface Token extends BToken {}
export interface Player extends BPlayer {}

export interface Card extends BCard {}
export interface Deck {
	playerId: number;
	deck: Array<number | null>;
}

export interface Character extends BCharacter {}
export interface GameClass extends BGameClass {}

export interface CardResponse {
	cardCount: number;
	cards: Card[];
	page: number;
	pageCount: number;
}

export interface Response<T> {
	status: boolean;
	message?: string;
	data: T;
}

import { BToken, BPlayer, BCard, BCharacter, BGameClass } from "./base";

export interface Token extends BToken {}
export interface Player extends BPlayer {}
export type Loading = boolean;

export interface Card extends BCard {}
export type Deck = Array<Card | null>;

export interface Character extends BCharacter {}
export interface GameClass extends BGameClass {}

export interface Drag {
	isDragOn: boolean;
	cardId: number;
	dragFromDeck: boolean;
}
export interface DragNodeCoors {
	x: number;
	y: number;
}

export interface Option {
	label: string;
	value: string | number;
}
export interface Filter {
	name: string;
	options: Option[];
	current: Option | null,
	color: string,
}

export interface Pagination {
	total: number;
	current: number;
}

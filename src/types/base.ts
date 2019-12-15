export interface BToken {
	playerId: number;
	token: boolean;
	expiredDate: Date | null,
}

export interface BPlayer {
	id: number;
	characterId: number;
	classId: number;
}

export interface BCard {
	id: number;
	name: string;
	health: number;
	attack: number;
	manaCost: number;
	image?: string;
	text: string;
	flavorText?: string;
	rarityId: number;
	classId: number;
}

export interface BCharacter {
	id: number;
	name: string;
	image: string;
}

export interface BGameClass {
	id: number;
	name: string;
}

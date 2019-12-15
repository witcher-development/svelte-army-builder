import { get, writable } from 'svelte/store';

import { Character } from "../types/client";

export const state = writable<Character[]>([], () => {});
export const getState = (): Character[] => get(state);
export const getCharacterNameById = (characterId: number): string => {
	const characterObject = get(state).find(
		({ id }) => id === characterId,
	);
	return characterObject ? characterObject.name : '';
};

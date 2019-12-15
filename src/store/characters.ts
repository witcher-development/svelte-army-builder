import { get, writable } from 'svelte/store';

import { Character } from "../types/client";
import { getCharacters } from "../server";

export const state = writable<Character[]>([], () => {});
export const getState = (): Character[] => get(state);
const setState = (characters: Character[]) => state.set(characters);

export const getCharacterNameById = (characterId: number): string => {
	const characterObject = get(state).find(
		({ id }) => id === characterId,
	);
	return characterObject ? characterObject.name : '';
};

export const fetchCharacters = async (): Promise<Character[]> => {
	const characters = await getCharacters();

	setState(characters);
	return characters;
};

import { get, writable } from 'svelte/store';

import { Character } from '../types/client';
import { getCharacters } from '../server';

export const state = writable<Character[]>([], () => {});
export const getState = (): Character[] => get(state);
const setState = (characters: Character[]) => state.set(characters);

export const getCharacterNameById = (characterId: number): string => {
	const characterObject = getState().find(({ id }) => id === characterId);
	return characterObject ? characterObject.name : '';
};

export const fetchCharacters = async (): Promise<Character[]> => {
	const response = await getCharacters();
	const { data: characters } = response;

	setState(characters);
	return characters;
};

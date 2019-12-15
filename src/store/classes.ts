import { get, writable } from 'svelte/store';

import { GameClass } from '../types/client';
import { getClasses } from '../server';

export const state = writable<GameClass[]>([], () => {});
export const getState = (): GameClass[] => get(state);
const setState = (classes: GameClass[]) => state.set(classes);

export const getClassNameById = (classId: number): string => {
	const classObject = get(state).find(({ id }) => id === classId);
	return classObject ? classObject.name : 'All classes';
};

export const fetchClasses = async (): Promise<GameClass[]> => {
	const classes = await getClasses();

	setState(classes);
	return classes;
};
